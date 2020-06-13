export default Object.freeze({
  ENUM: {
    'BEARER': 'Bearer',
  },
  get values() {
    return Object.values(this.ENUM)
  },
})
