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
    
    type ExerciseTemplate {
        level: String
        quantity: Int
    }
    
    type Query {
        exercises (level: String, numberOfQuestions: Int): [Exercise]
        exercisesList: [Exercise]
        exerciseTemplate: [ExerciseTemplate]
    }        
`
