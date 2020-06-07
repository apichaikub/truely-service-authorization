import { pickFirstKey } from '../../utils/lib/'

export default async (model, values, options) => {
  const response = await model.create(values, options)

  return response ?
    pickFirstKey(response.dataValues) :
    null
}
