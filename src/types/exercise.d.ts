interface Answer {
  uuid: string
  text: string
  position: number | null
}

interface Exercise {
  id?: string
  help: string
  level: string
  answers: Array<Answer>
  words: Array<Word>
}

interface Word {
  text: string
  type: 'text' | 'response'
  answer: Answer | null
}
