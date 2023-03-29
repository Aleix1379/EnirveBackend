export interface Answer {
  id: number
  text: string
  position: number
}

export interface Exercise {
  id: number
  help: string
  level: 'beginner' | 'intermediate'
  sentence: string
  answers: Array<Answer>
}
