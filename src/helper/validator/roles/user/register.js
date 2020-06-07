import { USER_ROLE } from '../../../enum'

export default {
  username: 'required|string',
  password: 'required|string|min:6|max:48',
  role: [
    'required',
    { 'in': [...USER_ROLE.values] },
  ],
}
