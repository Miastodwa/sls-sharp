import { S3 } from 'aws-sdk-promise'
const s3 = new S3()

export default async function (key: string){

	const file = await
		s3.headObject({ Bucket: process.env.BUCKET, Key: key })
		.promise()
		.catch( e => e )

	return file
}
