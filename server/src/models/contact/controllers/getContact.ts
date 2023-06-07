import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { GetContactSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function getContact(
	request: FastifyRequestTypebox<typeof GetContactSchema>,
	reply: FastifyReplyTypebox<typeof GetContactSchema>
) {
	const { contactId } = request.params;
	try {
		const contact = await prisma.contact.findUnique({
			where: {
				id: contactId,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				vat: true,
				website: true,
				billing_address: {
					select: {
						id: true,
						name: true,
						line_1: true,
						line_2: true,
						city: true,
						postal_code: true,
						state: true,
						country: true,
						geo: true,
					},
				},
				shipping_address: {
					select: {
						id: true,
						name: true,
						line_1: true,
						line_2: true,
						city: true,
						postal_code: true,
						state: true,
						country: true,
						geo: true,
					},
				},
			},
		});

		if (!contact)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send(contact);
	} catch (error) {
		console.error('getContact error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
