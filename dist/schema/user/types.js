"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTypes = void 0;
exports.UserTypes = `
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
        login (email: String!, password: String!): SignResponse!
        registerUser (username: String!, email: String!, password: String!): SignResponse
        updateUserAvatar (avatar: String!): User!
    }
    type Query {
        profile : User!
    }
`;
//# sourceMappingURL=types.js.map