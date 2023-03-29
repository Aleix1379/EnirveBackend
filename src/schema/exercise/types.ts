export const ExerciseTypes = `
    type Exercise {
      id: ID!
      sentence: String!
      answers: [Answer]!
      help: String
      level: String
    }
    
    type Answer {
      id: ID!
      text: String!
      position: Int
    }
    
    type Query {
        exercises (levels: [String], numberOfQuestions: Int): [Exercise]
    }        
`
