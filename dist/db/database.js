"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL);
exports.sequelize = sequelize;
const connect = () => {
    return new Promise((resolve, reject) => {
        try {
            sequelize.authenticate().then(() => {
                console.log('Postgres connection has been established successfully.');
                sequelize
                    .sync({ alter: true })
                    .then(() => {
                    console.log('sequelize synced successfully.');
                    resolve(true);
                })
                    .catch(error => {
                    console.error(error);
                    reject(error);
                });
            });
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            reject(error);
        }
    });
};
exports.connect = connect;
//# sourceMappingURL=database.js.map