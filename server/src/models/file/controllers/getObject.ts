import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { GetFileSchema } from '../schemas';
import prisma from '@/providers/database/prisma';
import { getObject as getS3Object } from '@/providers/storage/objects';
import {
	handleDownload,
	normalizeContentType,
} from '@/providers/storage/utils';

async function getObject(
	request: FastifyRequestTypebox<typeof GetFileSchema>,
	reply: FastifyReplyTypebox<typeof GetFileSchema>
) {
	try {
		const file = await prisma.file.findUnique({
			where: {
				id: request.params.fileId,
			},
		});

		if (!file) {
			return reply.status(400).send({
				status: 400,
				error: 'Invalid key',
				message: 'No file has been found',
			});
		}

		const data = await getS3Object(file.bucket, file.key);

		reply
			.status(data.metadata.httpStatusCode ?? 200)
			.header('Accept-Ranges', 'bytes')
			.header('Content-Type', normalizeContentType(data.metadata.mimetype))
			.header('Cache-Control', data.metadata.cacheControl)
			.header('ETag', data.metadata.eTag)
			.header('Content-Length', data.metadata.contentLength)
			.header('Last-Modified', data.metadata.lastModified?.toUTCString());

		if (data.metadata.contentRange) {
			reply.header('Content-Range', data.metadata.contentRange);
		}

		handleDownload(reply, file.file_name);

		return reply.send(data.body);
	} catch (error: any) {
		console.error('getObject error: ', error);
		if (error.$metadata?.httpStatusCode === 304) {
			return reply.status(304).send();
		}

		if (error.$metadata?.httpStatusCode === 404) {
			return reply.status(404).send();
		}

		return reply
			.status(500)
			.send({ status: 500, message: 'Something went wrong' });
	}
}

export { getObject };
