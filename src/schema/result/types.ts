export const ResultTypes = `
    type Verb {
        id: Int!
        present: String! 
        simple: String
        participle: String
    }
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }
    type Result {
        verb: Verb!
        completed: Boolean!
    }
    input VerbInput {
        verbId: Int!
        completed: Boolean!
    }
    type Mutation {
        updateUserResults (results: [VerbInput]): Boolean!
    }
    type Query {
        userResults: [Result]
    }
`
