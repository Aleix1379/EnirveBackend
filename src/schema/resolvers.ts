import { QuoteMutation, QuoteQuery } from './quote'
import { UserMutation, UserQuery } from './user'
import { ResultMutation, ResultQuery } from './result'
import { IrregularVerbMutation, IrregularVerbQuery } from './irregular-verbs'
import { ScoreMutation, ScoreQuery } from './score'

export const resolvers = {
  Query: {
    ...QuoteQuery,
    ...UserQuery,
    ...ResultQuery,
    ...IrregularVerbQuery,
    ...ScoreQuery
  },
  Mutation: {
    ...QuoteMutation,
    ...UserMutation,
    ...ResultMutation,
    ...IrregularVerbMutation,
    ...ScoreMutation
  }
}
