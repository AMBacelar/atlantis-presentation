import { useEffect, useState } from 'react'

export type Player = { id: string; name: string }

export type QuizMode =
  | { mode: 'idle' }
  | { mode: 'question'; quizId: string; questionIndex: number; tally: number[] }
  | { mode: 'reveal'; quizId: string; questionIndex: number; tally: number[]; correctIndex: number | null }

export type QrMode = 'hidden' | 'corner' | 'fullscreen'

export type AppState = {
  slide: number
  stage: number
  players: Player[]
  quiz: QuizMode
  qrMode: QrMode
}

const initialState: AppState = {
  slide: 0,
  stage: 0,
  players: [],
  quiz: { mode: 'idle' },
  qrMode: 'corner',
}

export function useAppState(): AppState {
  const [state, setState] = useState<AppState>(initialState)

  useEffect(() => {
    const es = new EventSource('/api/events')
    es.addEventListener('state', (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data) as AppState
        setState(data)
      } catch {
        // ignore malformed messages
      }
    })
    return () => es.close()
  }, [])

  return state
}
