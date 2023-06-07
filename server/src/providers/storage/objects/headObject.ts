import type { ObjectMetadata } from '../types';

import { HeadObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '..';
import { StorageBackendError } from '../utils';

async function headObject(
	bucket: string,
	key: string
): Promise<ObjectMetadata> {
	try {
		const command = new HeadObjectCommand({
			Bucket: bucket,
			Key: key,
		});
		const data = await s3Client.send(command);
		return {
			cacheControl: data.CacheControl || 'no-cache',
			mimetype: data.ContentType || 'application/octet-stream',
			eTag: data.ETag || '',
			lastModified: data.LastModified,
			contentLength: data.ContentLength || 0,
			httpStatusCode: data.$metadata.httpStatusCode || 200,
			size: data.ContentLength || 0,
		};
	} catch (e: any) {
		throw StorageBackendError.fromError(e);
	}
}
export { headObject };
