import type { ObjectMetadata } from '../types';

import { CopyObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '..';
import { StorageBackendError } from '../utils';

async function copyObject(
	bucket: string,
	source: string,
	destination: string
): Promise<Pick<ObjectMetadata, 'httpStatusCode'>> {
	try {
		const command = new CopyObjectCommand({
			Bucket: bucket,
			CopySource: `/${bucket}/${source}`,
			Key: destination,
		});
		const data = await s3Client.send(command);
		return {
			httpStatusCode: data.$metadata.httpStatusCode || 200,
		};
	} catch (e: any) {
		throw StorageBackendError.fromError(e);
	}
}

export { copyObject };
