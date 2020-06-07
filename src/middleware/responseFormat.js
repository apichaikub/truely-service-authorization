import config from '../config'

// Use to transform result data, let success and error to be the same pattern.
const transform = (res, error = null, data = null) => {
  const result = {
    devInfo: {
      opeationName: res.opeationName,
      statusCode: res.statusCode,
      debug: error,
    },
    results: data,
  }

  // the result will response only for development mode.
  if (config.environment === 'production') {
    delete result.devInfo
  }

  return result
}

// Mainly function use to custom response in `express`.
const responseFormat = (req, res, next) => {
  // Use to response with success
  res.success = (input) => {
    const error = null
    const data = input
    const result = transform(res, error, data)
    res.json(result)
  }

  // Use to response with error
  res.fail = (input) => {
    const error = input
    const data = null
    const result = transform(res, error, data)
    res.json(result)
  }

  next()
}

export default responseFormat
