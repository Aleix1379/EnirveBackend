export const UserTypes = `
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        avatar: String!
    }
    type SignResponse {
        jwt: String!
        user: User!
    }
    type Mutation {
        login (username: String!, password: String!): SignResponse!
        registerUser (username: String!, email: String!, password: String!): SignResponse
        updateUserAvatar (avatar: String!): User!
    }
    type Query {
        profile : User!
    }
`
