import { gql } from 'apollo-server-express'
import { UserTypes } from './user'
import { ResultTypes } from './result'
import { IrregularVerbsTypes } from './irregular-verbs'
import { ScoreTypes } from './score'
import { ExerciseTypes } from './exercise'

export const typeDefs = gql`
  type Query
  type Mutation
  ${UserTypes}
  ${ResultTypes}
  ${IrregularVerbsTypes}
  ${ScoreTypes}
  ${ExerciseTypes}
`
