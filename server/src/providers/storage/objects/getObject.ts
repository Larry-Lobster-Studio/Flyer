import type { GetObjectCommandInput } from '@aws-sdk/client-s3';
import type { BrowserCacheHeaders, ObjectResponse } from '../types';

import { GetObjectCommand } from '@aws-sdk/client-s3';

import s3Client from '..';

async function getObject(
	bucketName: string,
	key: string,
	versionId?: string,
	headers?: BrowserCacheHeaders
): Promise<ObjectResponse> {
	const input: GetObjectCommandInput = {
		Bucket: bucketName,
		IfNoneMatch: headers?.ifNoneMatch,
		Key: key,
		Range: headers?.range,
		VersionId: versionId,
	};
	if (headers?.ifModifiedSince) {
		input.IfModifiedSince = new Date(headers.ifModifiedSince);
	}
	const command = new GetObjectCommand(input);
	const data = await s3Client.send(command);

	return {
		metadata: {
			cacheControl: data.CacheControl || 'no-cache',
			mimetype: data.ContentType || 'application/octa-stream',
			eTag: data.ETag || '',
			lastModified: data.LastModified,
			contentRange: data.ContentRange,
			contentLength: data.ContentLength || 0,
			httpStatusCode: data.$metadata.httpStatusCode || 200,
			size: data.ContentLength || 0,
		},
		body: data.Body,
	};
}

export { getObject };
