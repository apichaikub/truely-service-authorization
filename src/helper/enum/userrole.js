export default Object.freeze({
  ENUM: {
    'GUEST': 'GUEST',
    'ADMIN': 'ADMIN',
  },
  get values() {
    return Object.values(this.ENUM)
  },
})
