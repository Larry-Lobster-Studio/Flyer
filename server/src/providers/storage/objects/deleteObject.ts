import { DeleteObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '..';

async function deleteObject(bucket: string, key: string): Promise<void> {
	const command = new DeleteObjectCommand({
		Bucket: bucket,
		Key: key,
	});
	await s3Client.send(command);
}

export { deleteObject };
