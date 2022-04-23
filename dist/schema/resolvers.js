"use strict";
/*
import { v4 as uuid } from 'uuid'
import Quote from '../models/Quote'
// Provide resolver functions for your schema fields
export const resolvers = {
  Mutation: {
    addQuote: async (parent: any, ctx: any) => {
      const id = uuid()
      const q = await Quote.create({
        id,
        phrase: ctx.phrase,
        quotee: ctx.quotee
      })
      return {
        id: q.getDataValue('id'),
        phrase: q.getDataValue('phrase'),
        quotee: q.getDataValue('quotee')
      }
    },
    editQuote: async (parent: any, ctx: any) => {
      const q = await Quote.update(
        { phrase: ctx.phrase, quotee: ctx.quotee },
        { where: { id: ctx.id }, returning: true }
      )
      return {
        id: q[1][0].getDataValue('id'),
        phrase: q[1][0].getDataValue('phrase'),
        quotee: q[1][0].getDataValue('quotee')
      }
    },
    deleteQuote: async (parent: any, ctx: any) => {
      const q = await Quote.destroy({ where: { id: ctx.id } })
      return { ok: q }
    }
  },
  Query: {
    quotes: async () => await Quote.findAll({})
  }
}
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const quote_1 = require("./quote");
exports.resolvers = {
    Query: Object.assign({}, quote_1.QuoteQuery),
    Mutation: Object.assign({}, quote_1.QuoteMutation)
};
//# sourceMappingURL=resolvers.js.map