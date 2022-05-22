"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const quote_1 = require("./quote");
const user_1 = require("./user");
const result_1 = require("./result");
const irregular_verbs_1 = require("./irregular-verbs");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query
  type Mutation
  ${quote_1.QuoteTypes}
  ${user_1.UserTypes}
  ${result_1.ResultTypes}
  ${irregular_verbs_1.IrregularVerbsTypes}
`;
//# sourceMappingURL=typeDefs.js.map