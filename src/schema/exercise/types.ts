export const ExerciseTypes = `
    type Exercise {
      id: ID!
      words: [Word]
      answers: [Answer]!
      help: String
      level: String
    }
    
    type Answer {
        uuid: ID!
        text: String!
        position: Int
    }
    
    type Word {
        text: String!
        type: String!
        answer: Answer
    }    
    
    type Query {
        exercises (levels: [String], numberOfQuestions: Int): [Exercise]
        exercisesList: [Exercise]
    }        
`
