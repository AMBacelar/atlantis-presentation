import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState, type QrMode } from '../hooks/useAppState'
import { slides } from '../slides/registry'
import { quizzes, findQuiz } from '../quizzes/registry'
import { checkAuth, setPosition, startQuestion, revealQuestion, endQuiz, setQrMode } from '../lib/api'

export default function Present() {
  const navigate = useNavigate()
  const state = useAppState()
  const [authChecked, setAuthChecked] = useState(false)
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizzes[0]?.id ?? '')

  useEffect(() => {
    let cancelled = false
    checkAuth().then((ok) => {
      if (cancelled) return
      if (!ok) navigate('/login', { replace: true })
      else setAuthChecked(true)
    })
    return () => { cancelled = true }
  }, [navigate])

  const quizActive = state.quiz.mode !== 'idle'

  const go = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, n))
    void setPosition(clamped, 0)
  }, [])
  const next = useCallback(() => {
    const cur = slides[state.slide]
    const maxStage = (cur?.stages ?? 1) - 1
    if (state.stage < maxStage) void setPosition(state.slide, state.stage + 1)
    else if (state.slide < slides.length - 1) void setPosition(state.slide + 1, 0)
  }, [state.slide, state.stage])
  const prev = useCallback(() => {
    if (state.stage > 0) void setPosition(state.slide, state.stage - 1)
    else if (state.slide > 0) {
      const prevSlide = slides[state.slide - 1]
      const lastStage = Math.max(0, (prevSlide?.stages ?? 1) - 1)
      void setPosition(state.slide - 1, lastStage)
    }
  }, [state.slide, state.stage])

  useEffect(() => {
    if (!authChecked || quizActive) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) return
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [authChecked, quizActive, next, prev])

  if (!authChecked) return <main className="present"><p>…</p></main>

  return (
    <main className="present">
      <SlideSection
        currentSlide={state.slide}
        currentStage={state.stage}
        quizActive={quizActive}
        go={go}
        next={next}
        prev={prev}
      />
      <QrToggle current={state.qrMode} />
      <QuizSection
        state={state}
        selectedQuizId={selectedQuizId}
        setSelectedQuizId={setSelectedQuizId}
      />
      <PlayersStrip playerCount={state.players.length} players={state.players} />
    </main>
  )
}

function QrToggle({ current }: { current: QrMode }) {
  const options: { mode: QrMode; label: string }[] = [
    { mode: 'hidden', label: 'Hide' },
    { mode: 'corner', label: 'Corner' },
    { mode: 'fullscreen', label: 'Full' },
  ]
  return (
    <section className="present-qr">
      <h2>QR code</h2>
      <div className="qr-toggle">
        {options.map((o) => (
          <button
            key={o.mode}
            className={current === o.mode ? 'qr-toggle-btn active' : 'qr-toggle-btn'}
            onClick={() => void setQrMode(o.mode)}
            aria-pressed={current === o.mode}
          >
            {o.label}
          </button>
        ))}
      </div>
    </section>
  )
}

function SlideSection({
  currentSlide,
  currentStage,
  quizActive,
  go,
  next,
  prev,
}: {
  currentSlide: number
  currentStage: number
  quizActive: boolean
  go: (n: number) => void
  next: () => void
  prev: () => void
}) {
  const slide = slides[currentSlide] ?? slides[0]
  const totalStages = slide.stages ?? 1
  const stageLabel = totalStages > 1 ? ` · stage ${currentStage + 1}/${totalStages}` : ''
  const atFirst = currentSlide === 0 && currentStage === 0
  const atLast = currentSlide === slides.length - 1 && currentStage === totalStages - 1
  return (
    <>
      <header className="present-header">
        <div className="present-position">
          Slide {currentSlide + 1} / {slides.length}
          {totalStages > 1 && <span className="present-stage">{stageLabel}</span>}
          {quizActive && <span className="present-pill">quiz live</span>}
        </div>
        <h1 className="present-title">{slide.title}</h1>
      </header>

      <section className="present-notes">
        <h2>Notes</h2>
        <p>{slide.notes}</p>
      </section>

      {slide.details && (
        <details className="present-details">
          <summary>More detail</summary>
          <div>{slide.details}</div>
        </details>
      )}

      <section className="present-jump">
        <h2>Jump to</h2>
        <ol>
          {slides.map((s, i) => (
            <li key={s.id}>
              <button
                className={i === currentSlide ? 'jump-btn active' : 'jump-btn'}
                onClick={() => go(i)}
              >
                <span className="jump-n">{i + 1}</span>
                <span className="jump-t">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <nav className="present-controls">
        <button onClick={prev} disabled={atFirst}>◀ Prev</button>
        <button onClick={next} disabled={atLast}>Next ▶</button>
      </nav>
    </>
  )
}

function QuizSection({
  state,
  selectedQuizId,
  setSelectedQuizId,
}: {
  state: ReturnType<typeof useAppState>
  selectedQuizId: string
  setSelectedQuizId: (id: string) => void
}) {
  const q = state.quiz
  const activeQuiz = q.mode !== 'idle' ? findQuiz(q.quizId) : undefined
  const activeQuestion = activeQuiz && q.mode !== 'idle' ? activeQuiz.questions[q.questionIndex] : undefined

  const selectableQuiz = findQuiz(selectedQuizId) ?? quizzes[0]

  return (
    <section className="present-quiz">
      <h2>Quiz</h2>

      {q.mode === 'idle' && selectableQuiz && (
        <>
          <label className="quiz-picker">
            Quiz
            <select value={selectedQuizId} onChange={(e) => setSelectedQuizId(e.target.value)}>
              {quizzes.map((quiz) => (
                <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
              ))}
            </select>
          </label>
          <ol className="quiz-questions">
            {selectableQuiz.questions.map((qq, i) => (
              <li key={i}>
                <button
                  className="quiz-q-btn"
                  onClick={() => startQuestion(selectableQuiz.id, i, qq.options.length)}
                >
                  <span className="quiz-q-n">Q{i + 1}</span>
                  <span className="quiz-q-t">{qq.prompt}</span>
                </button>
              </li>
            ))}
          </ol>
        </>
      )}

      {q.mode === 'question' && activeQuestion && (
        <>
          <p className="quiz-live-label">Live: {activeQuiz?.title}</p>
          <p className="quiz-live-prompt">{activeQuestion.prompt}</p>
          <ul className="quiz-live-options">
            {activeQuestion.options.map((opt, i) => (
              <li key={i}>
                <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
                <span className="quiz-opt-text">{opt}</span>
                <span className="quiz-opt-count">{q.tally[i] ?? 0}</span>
              </li>
            ))}
          </ul>
          <div className="quiz-actions">
            <button
              onClick={() => revealQuestion(activeQuestion.correctIndex ?? null)}
            >
              Reveal
            </button>
            <button className="ghost" onClick={() => endQuiz()}>End quiz</button>
          </div>
        </>
      )}

      {q.mode === 'reveal' && activeQuestion && activeQuiz && (
        <>
          <p className="quiz-live-label">Revealed: {activeQuiz.title}</p>
          <p className="quiz-live-prompt">{activeQuestion.prompt}</p>
          <ul className="quiz-live-options">
            {activeQuestion.options.map((opt, i) => {
              const isCorrect = q.correctIndex === i
              return (
                <li key={i} className={isCorrect ? 'correct' : ''}>
                  <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="quiz-opt-text">{opt}</span>
                  <span className="quiz-opt-count">{q.tally[i] ?? 0}</span>
                </li>
              )
            })}
          </ul>
          <div className="quiz-actions">
            {activeQuiz.questions[q.questionIndex + 1] && (
              <button
                onClick={() => startQuestion(
                  activeQuiz.id,
                  q.questionIndex + 1,
                  activeQuiz.questions[q.questionIndex + 1].options.length,
                )}
              >
                Next question →
              </button>
            )}
            <button className="ghost" onClick={() => endQuiz()}>End quiz</button>
          </div>
        </>
      )}
    </section>
  )
}

function PlayersStrip({ playerCount, players }: { playerCount: number; players: { id: string; name: string }[] }) {
  if (playerCount === 0) return null
  return (
    <section className="present-players">
      <h2>{playerCount} {playerCount === 1 ? 'player' : 'players'}</h2>
      <div className="players-chips">
        {players.map((p) => (
          <span key={p.id} className="player-chip">{p.name}</span>
        ))}
      </div>
    </section>
  )
}
