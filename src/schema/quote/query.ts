import Quote from '../../models/Quote'

export const QuoteQuery = {
  quotes: async () => await Quote.findAll({})
}
