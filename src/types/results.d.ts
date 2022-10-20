interface VerbResult {
  id: number
  present: string
  simple: string
  participle: string
}
export interface UserResult {
  verbId: number
  completed: boolean
  verb: VerbResult
}
