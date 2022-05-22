import IrregularVerb from '../models/IrregularVerb'
import { verbs } from './irregular-verbs'
import Result from '../models/Result'

const initDatabase = async () => {
  initIrregularVerbs().catch(error =>
    console.error('initIrregularVerbs', error)
  )
  Result.sync().catch(error => console.error('Result.sync', error))
}

const initIrregularVerbs = async () => {
  const verb = await IrregularVerb.findOne({ where: { id: 1 } })
  if (!verb) {
    verbs.forEach(verb => {
      IrregularVerb.create({
        id: verb.id,
        present: verb.present,
        simple: verb.simple,
        participle: verb.participle
      })
    })
  }
}

export { initDatabase }
