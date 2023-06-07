import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { UploadFileSchema } from '../schemas';
import prisma from '@/providers/database/prisma';
import { uploadObject as uploadS3Object } from '@/providers/storage/objects';
import { incomingFileInfo } from '@/providers/storage/utils';

import { createId } from '@/utils/createId';
import errors from '@/common/errors';
import { config } from '@/config/main.config';

async function uploadObject(
	request: FastifyRequestTypebox<typeof UploadFileSchema>,
	reply: FastifyReplyTypebox<typeof UploadFileSchema>
) {
	const userSession: UserSession = request['user-session'];

	try {
		const { body, cacheControl, fields, fileName, isTruncated, mimeType } =
			await incomingFileInfo(request, { fileSizeLimit: 10000000 });

		let newFileKey = createId('file', 50);
		let key = `
		${newFileKey}.${fileName.substring(
			fileName.lastIndexOf('.') + 1,
			fileName.length
		)}`;

		await uploadS3Object(config.s3.bucket, key, body, mimeType, cacheControl);

		if (isTruncated()) {
			return reply.status(413).send({
				status: 413,
				error: 'Payload too large',
				message: 'The object exceeded the maximum allowed size',
			});
		}

		const uploadFile = await prisma.file.create({
			data: {
				id: newFileKey,
				bucket: config.s3.bucket,
				key,
				file_name: fileName,
			},
		});

		return reply.status(200).send({
			object: 'file',
			id: uploadFile.id,
		});
	} catch (error) {
		console.error('uploadFile error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}

export { uploadObject };
