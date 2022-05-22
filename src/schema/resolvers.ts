import { QuoteMutation, QuoteQuery } from './quote'
import { UserMutation, UserQuery } from './user'
import { ResultMutation, ResultQuery } from './result'
import { IrregularVerbMutation, IrregularVerbQuery } from './irregular-verbs'

export const resolvers = {
  Query: {
    ...QuoteQuery,
    ...UserQuery,
    ...ResultQuery,
    ...IrregularVerbQuery
  },
  Mutation: {
    ...QuoteMutation,
    ...UserMutation,
    ...ResultMutation,
    ...IrregularVerbMutation
  }
}
