import * as AWS from 'aws-sdk'

const sharp = process.env.SHARP === 'local' ? require('../../sharp-local') : require('sharp')

console.log(process.env.SHARP)

export default async function (event, context, callback) {
	const response = {
		statusCode: 200,
		body: JSON.stringify({
			sharp: sharp.versions,
			query: event.queryStringParameters,
			path: event.pathParameters
		}),
	}

	callback(null, response)
}
