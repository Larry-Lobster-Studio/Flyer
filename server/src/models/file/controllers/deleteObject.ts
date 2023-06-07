import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { DeleteFileSchema } from '../schemas';
import prisma from '@/providers/database/prisma';
import { deleteObject as deleteS3Object } from '@/providers/storage/objects';
import errors from '@/common/errors';

async function deleteObject(
	request: FastifyRequestTypebox<typeof DeleteFileSchema>,
	reply: FastifyReplyTypebox<typeof DeleteFileSchema>
) {
	try {
		const file = await prisma.file.findUnique({
			where: {
				id: request.params.fileId,
			},
			include: {},
		});

		if (!file) return reply.status(400).send(errors.SOURCE_NOT_FOUND);

		if (file.invoice_id) {
			return reply.status(400).send(errors.SOURCE_NOT_FOUND);
		}

		await deleteS3Object(file.bucket, file.key);

		await prisma.file.delete({
			where: {
				id: file.id,
			},
		});

		return reply.status(200).send({
			id: file.id,
			object: 'file',
			deleted: true,
		});
	} catch (error) {
		console.error('deleteObject error: ', error);
		return reply.status(500).send(errors.SERVER_ERROR);
	}
}

export { deleteObject };
