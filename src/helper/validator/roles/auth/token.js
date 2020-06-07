export default {
  grant_type: 'required|string',
  username: 'required|string',
  password: 'required|string|min:6|max:48',
}
