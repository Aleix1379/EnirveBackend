"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class Quote extends sequelize_1.Model {
}
exports.default = Quote;
Quote.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true
    },
    phrase: sequelize_1.DataTypes.STRING,
    quotee: sequelize_1.DataTypes.STRING
}, { sequelize: database_1.sequelize, modelName: 'quote' });
//# sourceMappingURL=Quote.js.map