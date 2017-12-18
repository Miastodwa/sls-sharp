import QueryParser from './query-parser'
import findFile from './find-file'

const sharp = process.env.SHARP === 'local' ? require('../../sharp-local') : require('sharp')




export default async function (event, context, callback) {

	const query = new QueryParser(event)
	const original = await findFile(event.path)
	const transformed = await findFile(query.filename)

	console.log(query)
	console.log( original instanceof Error )
	console.log( transformed instanceof Error )










	const response = {
		statusCode: 200,
		body: JSON.stringify({
			options: query
		}),
	}

	callback(null, response)
}
