"use strict";
/*
import { gql } from 'apollo-server-express'
// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    quotee: String
  }
  type Mutation {
    addQuote(phrase: String!, quotee: String): Quote
    editQuote(id: ID!, phrase: String, quotee: String): Quote
    deleteQuote(id: ID!): DeleteResponse
  }
  type DeleteResponse {
    ok: Boolean!
  }
  type Query {
    quotes: [Quote]
  }
`
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const quote_1 = require("./quote");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
  ${quote_1.QuoteTypes}
`;
//# sourceMappingURL=typeDefs.js.map