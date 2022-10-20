export const ScoreTypes = `
    type Score {
        day: Int!
        week: Int!
        month: Int!
        total: Int!
    }
    type RankingItem {
        position: Int!
        username: String!
        avatar: String!
        points: Int!
    }
    type Mutation {
        addPoints (points: Int!): Boolean!
    }
    type Query {
        points: Score
        ranking (start: Int, limit: Int): [RankingItem]
    }
`
