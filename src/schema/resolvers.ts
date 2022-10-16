import { UserMutation, UserQuery } from './user'
import { ResultMutation, ResultQuery } from './result'
import { IrregularVerbMutation, IrregularVerbQuery } from './irregular-verbs'
import { ScoreMutation, ScoreQuery } from './score'

export const resolvers = {
  Query: {
    ...UserQuery,
    ...ResultQuery,
    ...IrregularVerbQuery,
    ...ScoreQuery
  },
  Mutation: {
    ...UserMutation,
    ...ResultMutation,
    ...IrregularVerbMutation,
    ...ScoreMutation
  }
}
