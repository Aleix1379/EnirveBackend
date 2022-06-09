export const ScoreTypes = `
    type Score {
        day: Int!
        week: Int!
        month: Int!
        total: Int!
    }
    type Mutation {
        addPoints (points: Int!): Boolean!
    }
    type Query {
        points: Score
    }
`
