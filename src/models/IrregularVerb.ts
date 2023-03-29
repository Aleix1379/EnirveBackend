import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db/database'
export default class IrregularVerb extends Model {}
IrregularVerb.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    present: { type: DataTypes.STRING },
    simple: { type: DataTypes.STRING },
    participle: { type: DataTypes.STRING }
  },
  { sequelize, modelName: 'irregular_verbs' }
)
/*
another like this:

{
        "sentence": "John __________ the piano beautifully, __________ a smile on his face.",
        "level": 'beginner',
        "answers": [
            {"id": 1, "text": "played", "position": 0},
            {"id": 2, "text": "smiled", "position": 1},
            {"id": 3, "text": "sang", "position": null},
            {"id": 4, "text": "danced", "position": null},
            {"id": 5, "text": "composed", "position": null},
            {"id": 6, "text": "conducted", "position": null},
            {"id": 7, "text": "listened", "position": null},
            {"id": 8, "text": "clapped", "position": null}
        ],
        "help": "The first blank should be filled with a verb in the past tense, indicating what John did with the piano. The second blank should be filled with an adverb ending in -ly, indicating how John did it. The correct answer is 'played' in the first blank and 'smiled' in the second blank."
    }


*/
