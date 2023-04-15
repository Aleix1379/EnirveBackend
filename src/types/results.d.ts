interface VerbResult {
  id: number
  present: string
  simple?: string
  participle?: string
}
export interface UserResult {
  verbId: number
  completed: boolean
}
export interface UserResultResponse {
  completed: boolean
  verb: VerbResult
}
