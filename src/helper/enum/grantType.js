export default Object.freeze({
  ENUM: {
    'PASSWORD': 'password',
    'REFRESH_TOKEN': 'refresh_token',
  },
  get values() {
    return Object.values(this.ENUM)
  },
})
