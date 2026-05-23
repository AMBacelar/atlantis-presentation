import { QRCodeSVG } from 'qrcode.react'
import { useAppState, type QrMode } from '../hooks/useAppState'
import { slides } from '../slides/registry'
import { findQuiz } from '../quizzes/registry'

export default function Display() {
  const state = useAppState()
  const joinUrl = `${window.location.origin}/join`

  if (state.quiz.mode !== 'idle') {
    return (
      <QuizDisplay
        quiz={state.quiz}
        players={state.players.length}
        joinUrl={joinUrl}
        qrMode={state.qrMode}
      />
    )
  }

  const slide = slides[state.slide] ?? slides[0]
  const Component = slide.Component
  const themeClass = slide.theme === 'light' ? 'theme-light' : 'theme-dark'

  return (
    <main className={`display ${themeClass}`}>
      <div className="display-slide" key={slide.id}>
        <Component stage={state.stage} />
      </div>
      <div className="display-progress">
        {state.slide + 1} / {slides.length}
      </div>
      <JoinOverlay joinUrl={joinUrl} playerCount={state.players.length} mode={state.qrMode} />
    </main>
  )
}

function JoinOverlay({
  joinUrl,
  playerCount,
  mode,
}: {
  joinUrl: string
  playerCount: number
  mode: QrMode
}) {
  if (mode === 'hidden') return null
  if (mode === 'fullscreen') return <JoinFullscreen joinUrl={joinUrl} playerCount={playerCount} />
  return <JoinChip joinUrl={joinUrl} playerCount={playerCount} />
}

function JoinChip({ joinUrl, playerCount }: { joinUrl: string; playerCount: number }) {
  return (
    <div className="display-join">
      <div className="display-join-qr">
        <QRCodeSVG value={joinUrl} size={96} bgColor="#14171c" fgColor="#e8eaed" includeMargin={false} />
      </div>
      <div className="display-join-meta">
        <div className="display-join-label">Join</div>
        <div className="display-join-url">{joinUrl.replace(/^https?:\/\//, '')}</div>
        <div className="display-join-count">
          {playerCount} {playerCount === 1 ? 'player' : 'players'}
        </div>
      </div>
    </div>
  )
}

function JoinFullscreen({ joinUrl, playerCount }: { joinUrl: string; playerCount: number }) {
  return (
    <div className="display-join-full">
      <div className="display-join-full-label">Join</div>
      <div className="display-join-full-qr">
        <QRCodeSVG value={joinUrl} size={520} bgColor="#14171c" fgColor="#e8eaed" includeMargin={false} />
      </div>
      <div className="display-join-full-url">{joinUrl.replace(/^https?:\/\//, '')}</div>
      <div className="display-join-full-count">
        {playerCount} {playerCount === 1 ? 'player' : 'players'} joined
      </div>
    </div>
  )
}

type QuizModeQuestion = Extract<ReturnType<typeof useAppState>['quiz'], { mode: 'question' }>
type QuizModeReveal = Extract<ReturnType<typeof useAppState>['quiz'], { mode: 'reveal' }>

function QuizDisplay({
  quiz: q,
  players,
  joinUrl,
  qrMode,
}: {
  quiz: QuizModeQuestion | QuizModeReveal
  players: number
  joinUrl: string
  qrMode: QrMode
}) {
  const quiz = findQuiz(q.quizId)
  const question = quiz?.questions[q.questionIndex]
  const totalAnswers = q.tally.reduce((a, b) => a + b, 0)

  if (!question) {
    return (
      <main className="display">
        <p>Quiz question not found.</p>
        <JoinOverlay joinUrl={joinUrl} playerCount={players} mode={qrMode} />
      </main>
    )
  }

  const showCounts = q.mode === 'reveal'
  const maxCount = Math.max(1, ...q.tally)

  if (quiz?.kind === 'rating') {
    const weighted = q.tally.reduce((acc, n, i) => acc + n * (i + 1), 0)
    const avg = totalAnswers > 0 ? weighted / totalAnswers : 0
    return (
      <main className="display display-rating">
        <div className="rating-header">
          <span className="quiz-label">{quiz?.title}</span>
          <span className="quiz-status">
            {totalAnswers} {totalAnswers === 1 ? 'rating' : 'ratings'}
            {' '}· {players} {players === 1 ? 'player' : 'players'} in
          </span>
        </div>

        <h1 className="rating-prompt">{question.prompt}</h1>

        {showCounts ? (
          <>
            <div className="rating-average">
              <div className="rating-average-num">{avg.toFixed(1)}</div>
              <div className="rating-average-stars" aria-hidden>
                {[1,2,3,4,5].map((n) => (
                  <span key={n} className={`rating-avg-star ${n <= Math.round(avg) ? 'on' : ''}`}>★</span>
                ))}
              </div>
              <div className="rating-average-label">average of {totalAnswers}</div>
            </div>
            <div className="rating-histogram">
              {[4,3,2,1,0].map((i) => {
                const count = q.tally[i] ?? 0
                const pct = (count / maxCount) * 100
                return (
                  <div key={i} className="rating-row">
                    <span className="rating-row-label">
                      {Array.from({length: i + 1}).map((_, k) => <span key={k} className="rating-row-star">★</span>)}
                    </span>
                    <div className="rating-bar-track">
                      <div className="rating-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="rating-row-count">{count}</span>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className="rating-waiting">
            <div className="rating-waiting-stars" aria-hidden>
              {[1,2,3,4,5].map((n) => <span key={n} className="rating-avg-star">★</span>)}
            </div>
            <p className="rating-waiting-text">Pick 1–5 stars on your phone.</p>
          </div>
        )}

        <JoinOverlay joinUrl={joinUrl} playerCount={players} mode={qrMode} />
      </main>
    )
  }

  return (
    <main className="display display-quiz">
      <div className="quiz-header">
        <span className="quiz-label">{quiz?.title}</span>
        <span className="quiz-status">
          {showCounts ? 'Results' : `${totalAnswers} / ${players} answered`}
        </span>
      </div>

      <h1 className="quiz-prompt">{question.prompt}</h1>

      <div className="quiz-options">
        {question.options.map((opt, i) => {
          const count = q.tally[i] ?? 0
          const isCorrect = q.mode === 'reveal' && q.correctIndex === i
          const cls = ['quiz-opt', isCorrect ? 'correct' : ''].filter(Boolean).join(' ')
          return (
            <div key={i} className={cls}>
              <span className="quiz-opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="quiz-opt-text">{opt}</span>
              {showCounts && (
                <>
                  <div className="quiz-opt-bar" style={{ width: `${(count / maxCount) * 100}%` }} />
                  <span className="quiz-opt-count">{count}</span>
                </>
              )}
            </div>
          )
        })}
      </div>

      <JoinOverlay joinUrl={joinUrl} playerCount={players} mode={qrMode} />
    </main>
  )
}
