"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrregularVerbsTypes = void 0;
exports.IrregularVerbsTypes = `
    type IrregularVerb {
        id: Int!
        present: String! 
        simple: String!
        participle: String! 
    }
    type Query {
        irregularVerbs(ids: [Int]): [IrregularVerb]
    }
`;
//# sourceMappingURL=types.js.map