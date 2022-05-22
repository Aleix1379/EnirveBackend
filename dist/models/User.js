"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../db/database");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'avatar1.png'
    }
}, { sequelize: database_1.sequelize, modelName: 'user' });
//# sourceMappingURL=User.js.map