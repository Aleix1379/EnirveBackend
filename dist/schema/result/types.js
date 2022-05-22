"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultTypes = void 0;
exports.ResultTypes = `
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
        id: Int!
        verbId: Int!
        completed: Boolean!
    }
    type Mutation {
        updateUserResults (userId: Int!, results: [VerbInput]): Boolean!
    }
    type Query {
        userResults(userId: Int!): [Result]
    }
`;
//# sourceMappingURL=types.js.map