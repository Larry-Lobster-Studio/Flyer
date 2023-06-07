import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { ListContactsSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function listContacts(
	request: FastifyRequestTypebox<typeof ListContactsSchema>,
	reply: FastifyReplyTypebox<typeof ListContactsSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { page, per_page, search, sort } = request.query;
	try {
		const total = await prisma.contact.count({
			where: {
				company_id,
				archived_at: null,
				OR: search
					? [
							{
								name: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								email: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								phone: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								vat: {
									contains: search,
									mode: 'insensitive',
								},
							},
					  ]
					: undefined,
			},
		});
		const contacts = await prisma.contact.findMany({
			where: {
				company_id,
				archived_at: null,
				OR: search
					? [
							{
								name: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								email: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								phone: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								vat: {
									contains: search,
									mode: 'insensitive',
								},
							},
					  ]
					: undefined,
			},
			skip: per_page! * page!,
			take: per_page!,
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
				name: true,
				email: true,
				vat: true,
			},
		});

		return reply.status(200).send({
			object: 'list',
			has_more: per_page! * (page ?? 0) + per_page! < total ? true : false,
			total,
			items: contacts,
		});
	} catch (error) {
		console.error('listContacts error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
