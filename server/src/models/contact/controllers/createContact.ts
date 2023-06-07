import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { CreateContactSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { createId, getAddress } from '@/utils';

export async function createContact(
	request: FastifyRequestTypebox<typeof CreateContactSchema>,
	reply: FastifyReplyTypebox<typeof CreateContactSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { billing_address, shipping_address, website, ...rest } = request.body;
	try {
		const contact = await prisma.contact.create({
			data: {
				id: createId('contact'),
				...rest,
				billing_address: billing_address && {
					create: {
						...(await getAddress(billing_address)),
					},
				},
				shipping_address: shipping_address && {
					create: {
						...(await getAddress(shipping_address)),
					},
				},
				company: {
					connect: {
						id: company_id,
					},
				},
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

		return reply.status(201).send(contact);
	} catch (error) {
		console.error('createContact error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
