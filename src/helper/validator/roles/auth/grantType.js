import { GRANT_TYPE } from '../../../enum'

export default {
  grant_type: [
    'required',
    { 'in': [...GRANT_TYPE.values] },
  ],
}
