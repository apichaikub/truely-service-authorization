export default Object.freeze({
  ENUM: {
    'ACCESS_TOKEN': 'x-access-token',
    'REFRESH_TOKEN': 'x-refresh-token',
  },
  get values() {
    return Object.values(this.ENUM)
  },
})
