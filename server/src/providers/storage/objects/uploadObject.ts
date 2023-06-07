import type { ObjectMetadata } from '../types';

import { Upload } from '@aws-sdk/lib-storage';

import s3Client from '..';
import { headObject } from './headObject';
import { StorageBackendError } from '../utils';

async function uploadObject(
	bucketName: string,
	key: string,
	body: NodeJS.ReadableStream,
	contentType: string,
	cacheControl: string
): Promise<ObjectMetadata> {
	try {
		const paralellUploadS3 = new Upload({
			client: s3Client,
			params: {
				Bucket: bucketName,
				Key: key,
				/* @ts-expect-error: https://github.com/aws/aws-sdk-js-v3/issues/2085 */
				Body: body,
				ContentType: contentType,
				CacheControl: cacheControl,
			},
		});

		const data = await paralellUploadS3.done();
		const metadata = await headObject(bucketName, key);

		return {
			httpStatusCode: data.$metadata.httpStatusCode || metadata.httpStatusCode,
			cacheControl: metadata.cacheControl,
			eTag: metadata.eTag,
			mimetype: metadata.mimetype,
			contentLength: metadata.contentLength,
			lastModified: metadata.lastModified,
			size: metadata.size,
			contentRange: metadata.contentRange,
		};
	} catch (err: any) {
		throw StorageBackendError.fromError(err);
	}
}

export { uploadObject };
