async function postJson(path: string, body: unknown): Promise<Response> {
  return fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(body),
  })
}

// ---- slides + auth ----
export async function setPosition(slide: number, stage: number): Promise<void> {
  const res = await postJson('/api/control', { slide, stage })
  if (!res.ok) throw new Error(`control failed: ${res.status}`)
}

export async function login(password: string): Promise<boolean> {
  const res = await postJson('/api/login', { password })
  return res.ok
}

export async function checkAuth(): Promise<boolean> {
  const res = await fetch('/api/me', { credentials: 'same-origin' })
  if (!res.ok) return false
  const data = await res.json() as { authed?: boolean }
  return data.authed === true
}

// ---- audience ----
export async function joinAsPlayer(name: string): Promise<{ id: string; name: string }> {
  const res = await postJson('/api/join', { name })
  if (!res.ok) throw new Error(`join failed: ${res.status}`)
  return res.json() as Promise<{ id: string; name: string }>
}

export async function whoami(): Promise<{ id: string | null; player: { id: string; name: string } | null }> {
  const res = await fetch('/api/whoami', { credentials: 'same-origin' })
  return res.json()
}

export async function submitAnswer(optionIndex: number): Promise<{ ok: boolean; error?: string }> {
  const res = await postJson('/api/answer', { optionIndex })
  if (res.ok) return { ok: true }
  const data = await res.json().catch(() => ({})) as { error?: string }
  return { ok: false, error: data.error ?? `error ${res.status}` }
}

// ---- presenter quiz controls ----
export async function startQuestion(quizId: string, questionIndex: number, optionCount: number): Promise<void> {
  const res = await postJson('/api/quiz/start', { quizId, questionIndex, optionCount })
  if (!res.ok) throw new Error(`start failed: ${res.status}`)
}

export async function revealQuestion(correctIndex: number | null): Promise<void> {
  const res = await postJson('/api/quiz/reveal', { correctIndex })
  if (!res.ok) throw new Error(`reveal failed: ${res.status}`)
}

export async function endQuiz(): Promise<void> {
  const res = await postJson('/api/quiz/end', {})
  if (!res.ok) throw new Error(`end failed: ${res.status}`)
}

// ---- presenter QR controls ----
export async function setQrMode(mode: 'hidden' | 'corner' | 'fullscreen'): Promise<void> {
  const res = await postJson('/api/qr', { mode })
  if (!res.ok) throw new Error(`qr failed: ${res.status}`)
}
