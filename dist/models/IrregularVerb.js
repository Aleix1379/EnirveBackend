"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
class IrregularVerb extends sequelize_1.Model {
}
exports.default = IrregularVerb;
IrregularVerb.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    present: { type: sequelize_1.DataTypes.STRING },
    simple: { type: sequelize_1.DataTypes.STRING },
    participle: { type: sequelize_1.DataTypes.STRING }
}, { sequelize: database_1.sequelize, modelName: 'irregular_verbs' });
//# sourceMappingURL=IrregularVerb.js.map