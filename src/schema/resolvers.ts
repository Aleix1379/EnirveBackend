import { UserMutation, UserQuery } from './user'
import { ResultMutation, ResultQuery } from './result'
import { IrregularVerbMutation, IrregularVerbQuery } from './irregular-verbs'
import { ScoreMutation, ScoreQuery } from './score'
import { ExerciseMutation, ExerciseQuery } from './exercise'

export const resolvers = {
  Query: {
    ...UserQuery,
    ...ResultQuery,
    ...IrregularVerbQuery,
    ...ScoreQuery,
    ...ExerciseQuery
  },
  Mutation: {
    ...UserMutation,
    ...ResultMutation,
    ...IrregularVerbMutation,
    ...ScoreMutation,
    ...ExerciseMutation
  }
}
