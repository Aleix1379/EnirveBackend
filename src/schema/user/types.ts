export const UserTypes = `
    type User {
        id: Int!
        username: String!
        email: String!
        avatar: String!
    }
    type FindOneResponse {
        username: String!
        avatar: String!
    }
    type SignResponse {
        jwt: String!
        user: User!
    }
    input UpdateProfileParams {
        username: String!
        email: String!
    }
    type Mutation {
        login (email: String!, password: String!): SignResponse!
        registerUser (username: String!, email: String!, password: String!): SignResponse
        updateUserAvatar (avatar: String!): User!
        verifyTokenWithGoogle (token: String!): SignResponse!
        verifyTokenWithApple (token: String!, nonce: String, username: String): SignResponse!
        updateProfile (username: String! email: String!): User!
        removeAccount: Boolean!
    }
    input FindOneFilter {
        username: String
        email: String
    }
    type Query {
        profile : User!
        findOne (filter: FindOneFilter): FindOneResponse
    }
`
