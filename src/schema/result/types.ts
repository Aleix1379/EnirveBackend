export const ResultTypes = `
    type Verb {
        id: Int!
        present: String! 
        simple: String!
        participle: String! 
    }
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }
    type Result {
        id: Int!
        verb: Verb!
        user: User!
        completed: Boolean!
    }
    input VerbInput {
        verbId: Int!
        completed: Boolean!
    }
    type Mutation {
        updateUserResults (userId: Int!, results: [VerbInput]): Boolean!
    }
    type Query {
        userResults(userId: Int): [Result]
    }
`
