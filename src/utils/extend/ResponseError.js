/**
 * ResponseError, Custom Error
 */
export default class ResponseError extends Error {
  /**
   * @param {Object} options
   * @param {Integer} options.code status code `http`
   * @param {String} options.message
   */
  constructor(options) {
    super()
    this.code = options.code
    this.message = options.message
  }
}
