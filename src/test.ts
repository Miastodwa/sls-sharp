import * as AWS from 'aws-sdk'

const sharpSrc = process.env.SHARP || 'sharp'
const sharp = require(sharpSrc)

const versions = sharp.versions

console.log(process.env.SHARP)

export default async function (event: object, context, callback) {
	const response = {
		statusCode: 200,
		body: JSON.stringify(versions),
	}

	callback(null, response)
}
