import * as AWS from 'aws-sdk'
const sharp = require('sharp')

const versions = sharp.versions

export default function (event, context, callback) {
	const response = {
		statusCode: 200,
		body: JSON.stringify(versions),
	}

	callback(null, response)
}
