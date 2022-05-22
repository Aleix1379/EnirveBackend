"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const quote_1 = require("./quote");
const user_1 = require("./user");
const result_1 = require("./result");
const irregular_verbs_1 = require("./irregular-verbs");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign(Object.assign({}, quote_1.QuoteQuery), user_1.UserQuery), result_1.ResultQuery), irregular_verbs_1.IrregularVerbQuery),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, quote_1.QuoteMutation), user_1.UserMutation), result_1.ResultMutation), irregular_verbs_1.IrregularVerbMutation)
};
//# sourceMappingURL=resolvers.js.map