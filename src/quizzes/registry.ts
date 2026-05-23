export type QuizQuestion = {
  prompt: string
  options: string[]      // 2–5 short strings
  correctIndex?: number  // optional — set if there's a definite right answer
}

export type Quiz = {
  id: string
  title: string
  kind?: 'quiz' | 'rating'
  questions: QuizQuestion[]
}

export const quizzes: Quiz[] = [
  {
    id: 'warmup',
    title: 'Warm-up',
    questions: [
      {
        prompt: 'Best snack at a games night?',
        options: ['Crisps', 'Popcorn', 'Pizza', 'Pick & mix'],
        // no correctIndex — pure opinion poll
      },
      {
        prompt: 'How many continents are there?',
        options: ['5', '6', '7', '8'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'topic-quiz',
    title: 'Quiz on the Topic',
    questions: [
      {
        prompt: 'Sample question — replace me',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'rating',
    title: 'Rate the talk',
    kind: 'rating',
    questions: [
      {
        prompt: 'How was the talk?',
        options: ['1', '2', '3', '4', '5'],
      },
    ],
  },
]

export function findQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id)
}
