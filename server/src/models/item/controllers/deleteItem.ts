import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { DeleteItemSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function deleteItem(
	request: FastifyRequestTypebox<typeof DeleteItemSchema>,
	reply: FastifyReplyTypebox<typeof DeleteItemSchema>
) {
	const { itemId } = request.params;
	try {
		const item = await prisma.item.delete({
			where: {
				id: itemId,
			},
		});

		if (!item)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send({
			id: item.id,
			object: 'item',
			deleted: true,
		});
	} catch (error) {
		console.error('deleteItem error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
