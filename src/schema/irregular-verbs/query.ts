import IrregularVerb from '../../models/IrregularVerb'

interface IrregularVerbParams {
  ids: Array<number>
}

export const IrregularVerbQuery = {
  irregularVerbs: async (root: any, { ids }: IrregularVerbParams) => {
    if (!ids) {
      return IrregularVerb.findAll({
        order: [['id', 'ASC']]
      })
    }
    return IrregularVerb.findAll({
      where: { id: ids },
      order: [['id', 'ASC']]
    })
  }
}
