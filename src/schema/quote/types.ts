export const QuoteTypes = `
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
