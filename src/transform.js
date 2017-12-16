import { successResponse } from './utils'

const transform = async (event, context, callback) => {

	const response = successResponse(event)

	callback(null, response)
}

export default transform
