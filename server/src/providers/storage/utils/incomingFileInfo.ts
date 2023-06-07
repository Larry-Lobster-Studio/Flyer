import type { FastifyRequest } from 'fastify';
import type { UploaderOptions } from '../types';

import { createId } from '@/utils/createId';

async function incomingFileInfo(
	request: FastifyRequest,
	options?: Pick<UploaderOptions, 'fileSizeLimit'>
) {
	const contentType = request.headers['content-type'];
	// let fileSizeLimit = await getFileSizeLimit(request.tenantId)
	let fileSizeLimit = 100000000;

	if (options?.fileSizeLimit) {
		if (options.fileSizeLimit <= fileSizeLimit) {
			fileSizeLimit = options.fileSizeLimit;
		}
	}

	let body: NodeJS.ReadableStream;
	let mimeType: string;
	let isTruncated: () => boolean;
	let fileName: string;
	let fields: [];

	let cacheControl: string;
	if (contentType?.startsWith('multipart/form-data')) {
		const formData = await request.file({
			limits: { fileSize: fileSizeLimit },
		});
		// https://github.com/fastify/fastify-multipart/issues/162
		/* @ts-expect-error: https://github.com/aws/aws-sdk-js-v3/issues/2085 */
		const cacheTime = formData.fields.cacheControl?.value;

		body = formData!.file;
		mimeType = formData!.mimetype;
		cacheControl = cacheTime ? `max-age=${cacheTime}` : 'no-cache';
		isTruncated = () => formData!.file.truncated;
		fileName = formData!.filename;
		fields = (formData?.fields as unknown as []) ?? [];
	} else {
		// just assume its a binary file
		body = request.raw;
		mimeType = request.headers['content-type'] || 'application/octet-stream';
		cacheControl = request.headers['cache-control'] ?? 'no-cache';
		isTruncated = () => {
			// @todo more secure to get this from the stream or from s3 in the next step
			return Number(request.headers['content-length']) > fileSizeLimit;
		};
		fileName = createId('file-name');
		fields = [];
	}

	return {
		body,
		mimeType,
		cacheControl,
		isTruncated,
		fileName,
		fields,
	};
}

export { incomingFileInfo };
