import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { DeleteContactSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function deleteContact(
	request: FastifyRequestTypebox<typeof DeleteContactSchema>,
	reply: FastifyReplyTypebox<typeof DeleteContactSchema>
) {
	const { contactId } = request.params;
	try {
		const contact = await prisma.contact.update({
			where: {
				id: contactId,
			},
			data: {
				archived_at: new Date(),
			},
		});

		if (!contact)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send({
			id: contact.id,
			object: 'contact',
			deleted: true,
		});
	} catch (error) {
		console.error('deleteContact error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
