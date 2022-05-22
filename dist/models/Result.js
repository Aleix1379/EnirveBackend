"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
const IrregularVerb_1 = __importDefault(require("./IrregularVerb"));
const User_1 = __importDefault(require("./User"));
class Result extends sequelize_1.Model {
}
exports.default = Result;
Result.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'result'
});
Result.belongsTo(IrregularVerb_1.default, {
    as: 'verb',
    targetKey: 'id',
    foreignKey: { name: 'verb_id' }
});
Result.belongsTo(User_1.default, {
    as: 'userId',
    targetKey: 'id',
    foreignKey: { name: 'user_id' }
});
//# sourceMappingURL=Result.js.map