import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../hooks/useAppState'
import { findQuiz } from '../quizzes/registry'
import { submitAnswer, whoami } from '../lib/api'

type Me = { id: string; name: string } | null

export default function Play() {
  const navigate = useNavigate()
  const state = useAppState()
  const [me, setMe] = useState<Me>(null)
  const [checking, setChecking] = useState(true)
  const [picked, setPicked] = useState<number | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    whoami().then(({ player }) => {
      if (cancelled) return
      if (!player) navigate('/join', { replace: true })
      else setMe(player)
      setChecking(false)
    })
    return () => { cancelled = true }
  }, [navigate])

  // Reset local pick whenever a new question starts.
  useEffect(() => {
    if (state.quiz.mode === 'question') setPicked(null)
  }, [state.quiz.mode, state.quiz.mode === 'question' ? state.quiz.questionIndex : null])

  if (checking || !me) {
    return <main className="play"><p className="play-status">…</p></main>
  }

  const q = state.quiz
  const quiz = q.mode !== 'idle' ? findQuiz(q.quizId) : undefined
  const question = quiz && q.mode !== 'idle' ? quiz.questions[q.questionIndex] : undefined

  async function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    setSubmitError(null)
    const result = await submitAnswer(i)
    if (!result.ok) {
      setSubmitError(result.error ?? 'failed')
      setPicked(null)
    }
  }

  return (
    <main className="play">
      <header className="play-header">
        <span className="play-name">{me.name}</span>
        <span className="play-count">{state.players.length} in</span>
      </header>

      {q.mode === 'idle' && (
        <section className="play-card">
          <h1>You're in!</h1>
          <p>Hang tight — a question will pop up when the host starts one.</p>
        </section>
      )}

      {q.mode === 'question' && question && quiz?.kind === 'rating' && (
        <section className="play-card">
          <h1 className="play-prompt">{question.prompt}</h1>
          <div className="play-stars">
            {question.options.map((_opt, i) => (
              <button
                key={i}
                className={`play-star ${picked !== null && i <= picked ? 'on' : ''}`}
                onClick={() => pick(i)}
                disabled={picked !== null}
                aria-label={`${i + 1} stars`}
              >★</button>
            ))}
          </div>
          {picked !== null && !submitError && (
            <p className="play-status">Thanks — your {picked + 1}★ rating is locked in.</p>
          )}
          {submitError && <p className="play-error">{submitError}</p>}
        </section>
      )}

      {q.mode === 'question' && question && quiz?.kind !== 'rating' && (
        <section className="play-card">
          <h1 className="play-prompt">{question.prompt}</h1>
          <div className="play-options">
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`play-option ${picked === i ? 'picked' : ''}`}
                onClick={() => pick(i)}
                disabled={picked !== null}
              >
                <span className="play-option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="play-option-text">{opt}</span>
              </button>
            ))}
          </div>
          {picked !== null && !submitError && (
            <p className="play-status">Locked in — waiting for the reveal.</p>
          )}
          {submitError && <p className="play-error">{submitError}</p>}
        </section>
      )}

      {q.mode === 'reveal' && question && quiz?.kind === 'rating' && (
        <section className="play-card">
          <h1 className="play-prompt">{question.prompt}</h1>
          <div className="play-stars">
            {question.options.map((_opt, i) => (
              <span
                key={i}
                className={`play-star revealed ${picked !== null && i <= picked ? 'on' : ''}`}
              >★</span>
            ))}
          </div>
          <p className="play-status">
            {picked !== null ? `You gave ${picked + 1}★. Thanks!` : 'No rating submitted.'}
          </p>
        </section>
      )}

      {q.mode === 'reveal' && question && quiz?.kind !== 'rating' && (
        <section className="play-card">
          <h1 className="play-prompt">{question.prompt}</h1>
          <div className="play-options">
            {question.options.map((opt, i) => {
              const isCorrect = q.correctIndex === i
              const isMine = picked === i
              const cls = [
                'play-option',
                'revealed',
                isCorrect ? 'correct' : '',
                isMine && !isCorrect && q.correctIndex !== null ? 'wrong' : '',
                isMine ? 'mine' : '',
              ].filter(Boolean).join(' ')
              return (
                <div key={i} className={cls}>
                  <span className="play-option-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="play-option-text">{opt}</span>
                  <span className="play-option-count">{q.tally[i] ?? 0}</span>
                </div>
              )
            })}
          </div>
          {picked === null && <p className="play-status">You didn't answer this one.</p>}
          {picked !== null && q.correctIndex !== null && (
            <p className="play-status">
              {picked === q.correctIndex ? '✓ Correct!' : '✗ Not this time.'}
            </p>
          )}
        </section>
      )}
    </main>
  )
}
