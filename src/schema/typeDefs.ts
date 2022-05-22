import { gql } from 'apollo-server-express'
import { QuoteTypes } from './quote'
import { UserTypes } from './user'
import { ResultTypes } from './result'
import { IrregularVerbsTypes } from './irregular-verbs'

export const typeDefs = gql`
  type Query
  type Mutation
  ${QuoteTypes}
  ${UserTypes}
  ${ResultTypes}
  ${IrregularVerbsTypes}
`
