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
