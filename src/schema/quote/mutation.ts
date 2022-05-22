import { v4 as uuid } from 'uuid'
import Quote from '../../models/Quote'

export const QuoteMutation = {
  addQuote: async (root: any, args: any) => {
    const id = uuid()
    const q = await Quote.create({
      id,
      phrase: args.phrase,
      quotee: args.quotee
    })
    return {
      id: q.getDataValue('id'),
      phrase: q.getDataValue('phrase'),
      quotee: q.getDataValue('quotee')
    }
  },
  editQuote: async (root: any, args: any) => {
    const q = await Quote.update(
      { phrase: args.phrase, quotee: args.quotee },
      { where: { id: args.id }, returning: true }
    )
    return {
      id: q[1][0].getDataValue('id'),
      phrase: q[1][0].getDataValue('phrase'),
      quotee: q[1][0].getDataValue('quotee')
    }
  },
  deleteQuote: async (root: any, args: any) => {
    const q = await Quote.destroy({ where: { id: args.id } })
    return { ok: q }
  }
}
