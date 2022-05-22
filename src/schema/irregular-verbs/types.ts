export const IrregularVerbsTypes = `
    type IrregularVerb {
        id: Int!
        present: String! 
        simple: String!
        participle: String! 
    }
    type Query {
        irregularVerbs(ids: [Int]): [IrregularVerb]
    }
`
