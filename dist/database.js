"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('postgres://postgres:42+42+564@localhost:5432/enirve');
exports.sequelize = sequelize;
const connect = () => {
    try {
        sequelize.authenticate().then(() => {
            console.log('Postgres connection has been established successfully.');
            sequelize
                .sync()
                .then(() => {
                console.log('sequelize synced successfully.');
            })
                .catch(error => console.error(error));
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
exports.connect = connect;
//# sourceMappingURL=database.js.map