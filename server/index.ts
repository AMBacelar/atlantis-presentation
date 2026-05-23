import { Hono, type Context } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { streamSSE } from 'hono/streaming'
import { getCookie, setCookie } from 'hono/cookie'
import { randomUUID } from 'node:crypto'

const PASSWORD = process.env.PRESENTER_PASSWORD ?? 'changeme'
const PORT = Number(process.env.PORT ?? 3000)
const PRESENTER_COOKIE = 'presenter_auth'
const PLAYER_COOKIE = 'player_id'
const IS_PROD = process.env.NODE_ENV === 'production'

type Player = { id: string; name: string }

type QuizMode =
  | { mode: 'idle' }
  | { mode: 'question'; quizId: string; questionIndex: number; tally: number[] }
  | { mode: 'reveal'; quizId: string; questionIndex: number; tally: number[]; correctIndex: number | null }

type PublicState = {
  slide: number
  stage: number
  players: Player[]
  quiz: QuizMode
}

// Internal state: keeps per-player answers (not broadcast) so we can prevent
// double-voting and rebuild the tally cleanly on reveal.
const players = new Map<string, Player>()
let slide = 0
let stage = 0
let quiz: QuizMode = { mode: 'idle' }
let answers = new Map<string, number>() // playerId → optionIndex for current question

function snapshot(): PublicState {
  return {
    slide,
    stage,
    players: [...players.values()],
    quiz,
  }
}

type Listener = (s: PublicState) => void
const listeners = new Set<Listener>()
function broadcast() {
  const s = snapshot()
  for (const fn of listeners) fn(s)
}

function isAuthed(c: Context): boolean {
  return getCookie(c, PRESENTER_COOKIE) === PASSWORD
}

function tallyFromAnswers(optionCount: number): number[] {
  const t = new Array(optionCount).fill(0) as number[]
  for (const idx of answers.values()) {
    if (idx >= 0 && idx < optionCount) t[idx] += 1
  }
  return t
}

const app = new Hono()

app.get('/api/state', (c) => c.json(snapshot()))

app.get('/api/events', (c) =>
  streamSSE(c, async (stream) => {
    const send = (s: PublicState) => stream.writeSSE({ event: 'state', data: JSON.stringify(s) })
    await send(snapshot())

    const listener: Listener = (s) => { void send(s) }
    listeners.add(listener)

    const heartbeat = setInterval(() => {
      void stream.writeSSE({ event: 'ping', data: '' })
    }, 15_000)

    await new Promise<void>((resolve) => {
      c.req.raw.signal.addEventListener('abort', () => {
        clearInterval(heartbeat)
        listeners.delete(listener)
        resolve()
      })
    })
  }),
)

// ---- Presenter auth ----
app.post('/api/login', async (c) => {
  const body = await c.req.json().catch(() => null) as { password?: string } | null
  if (!body || body.password !== PASSWORD) {
    return c.json({ error: 'invalid password' }, 401)
  }
  setCookie(c, PRESENTER_COOKIE, PASSWORD, {
    httpOnly: true, sameSite: 'Lax', secure: IS_PROD, path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return c.json({ ok: true })
})

app.get('/api/me', (c) => c.json({ authed: isAuthed(c) }))

// ---- Slides ----
// Presenter sends both slide and stage; client owns the state machine.
app.post('/api/control', async (c) => {
  if (!isAuthed(c)) return c.json({ error: 'unauthorized' }, 401)
  const body = await c.req.json().catch(() => null) as { slide?: number; stage?: number } | null
  if (
    !body
    || typeof body.slide !== 'number' || !Number.isFinite(body.slide)
    || typeof body.stage !== 'number' || !Number.isFinite(body.stage)
  ) {
    return c.json({ error: 'bad position' }, 400)
  }
  slide = Math.max(0, Math.floor(body.slide))
  stage = Math.max(0, Math.floor(body.stage))
  broadcast()
  return c.json({ ok: true, slide, stage })
})

// ---- Audience ----
app.post('/api/join', async (c) => {
  const body = await c.req.json().catch(() => null) as { name?: string } | null
  const rawName = (body?.name ?? '').trim().slice(0, 24)
  if (!rawName) return c.json({ error: 'name required' }, 400)

  let id = getCookie(c, PLAYER_COOKIE)
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    id = randomUUID()
    setCookie(c, PLAYER_COOKIE, id, {
      httpOnly: false, sameSite: 'Lax', secure: IS_PROD, path: '/',
      maxAge: 60 * 60 * 24,
    })
  }
  players.set(id, { id, name: rawName })
  broadcast()
  return c.json({ ok: true, id, name: rawName })
})

app.get('/api/whoami', (c) => {
  const id = getCookie(c, PLAYER_COOKIE)
  const player = id ? players.get(id) ?? null : null
  return c.json({ id: id ?? null, player })
})

app.post('/api/answer', async (c) => {
  const id = getCookie(c, PLAYER_COOKIE)
  if (!id || !players.has(id)) return c.json({ error: 'not joined' }, 401)
  if (quiz.mode !== 'question') return c.json({ error: 'no active question' }, 409)
  const body = await c.req.json().catch(() => null) as { optionIndex?: number } | null
  if (!body || typeof body.optionIndex !== 'number') {
    return c.json({ error: 'bad answer' }, 400)
  }
  const idx = Math.floor(body.optionIndex)
  if (idx < 0 || idx >= quiz.tally.length) return c.json({ error: 'option out of range' }, 400)
  if (answers.has(id)) return c.json({ error: 'already answered' }, 409)
  answers.set(id, idx)
  quiz = { ...quiz, tally: tallyFromAnswers(quiz.tally.length) }
  broadcast()
  return c.json({ ok: true })
})

// ---- Presenter quiz controls ----
app.post('/api/quiz/start', async (c) => {
  if (!isAuthed(c)) return c.json({ error: 'unauthorized' }, 401)
  const body = await c.req.json().catch(() => null) as
    | { quizId?: string; questionIndex?: number; optionCount?: number }
    | null
  if (
    !body
    || typeof body.quizId !== 'string'
    || typeof body.questionIndex !== 'number'
    || typeof body.optionCount !== 'number'
    || body.optionCount < 2
  ) {
    return c.json({ error: 'bad start payload' }, 400)
  }
  answers = new Map()
  quiz = {
    mode: 'question',
    quizId: body.quizId,
    questionIndex: Math.max(0, Math.floor(body.questionIndex)),
    tally: new Array(Math.floor(body.optionCount)).fill(0),
  }
  broadcast()
  return c.json({ ok: true })
})

app.post('/api/quiz/reveal', async (c) => {
  if (!isAuthed(c)) return c.json({ error: 'unauthorized' }, 401)
  const body = await c.req.json().catch(() => null) as { correctIndex?: number | null } | null
  if (quiz.mode !== 'question') return c.json({ error: 'no active question' }, 409)
  const correctIndex =
    body && typeof body.correctIndex === 'number' && body.correctIndex >= 0 && body.correctIndex < quiz.tally.length
      ? Math.floor(body.correctIndex)
      : null
  quiz = {
    mode: 'reveal',
    quizId: quiz.quizId,
    questionIndex: quiz.questionIndex,
    tally: quiz.tally,
    correctIndex,
  }
  broadcast()
  return c.json({ ok: true })
})

app.post('/api/quiz/end', async (c) => {
  if (!isAuthed(c)) return c.json({ error: 'unauthorized' }, 401)
  answers = new Map()
  quiz = { mode: 'idle' }
  broadcast()
  return c.json({ ok: true })
})

if (IS_PROD) {
  app.use('/assets/*', serveStatic({ root: './dist' }))
  app.get('*', serveStatic({ path: './dist/index.html' }))
}

serve({ fetch: app.fetch, port: PORT }, ({ port }) => {
  console.log(`server listening on http://localhost:${port}`)
})
