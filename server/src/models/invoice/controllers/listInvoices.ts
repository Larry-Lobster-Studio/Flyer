import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { toDecimal, dinero } from 'dinero.js';

import { ListInvoicesSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { filterInvoices } from '../validators';

export async function listInvoices(
	request: FastifyRequestTypebox<typeof ListInvoicesSchema>,
	reply: FastifyReplyTypebox<typeof ListInvoicesSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { page, per_page, search, sort } = request.query;
	try {
		const filter = filterInvoices({ search, company_id });
		const total = await prisma.invoice.count({
			where: filter,
		});
		const invoices = await prisma.invoice.findMany({
			where: filter,
			skip: per_page! * page!,
			take: per_page!,
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
				invoice_number: true,
				total: true,
				due_date: true,
				status: true,
				currency: true,
				contact: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		const items = invoices.map((inv) => {
			return {
				...inv,
				total: toDecimal(dinero(inv.total as any)),
				due_date: inv.due_date.toISOString(),
			};
		});

		return reply.status(200).send({
			object: 'list',
			has_more: per_page! * (page ?? 0) + per_page! < total ? true : false,
			total,
			items,
		});
	} catch (error) {
		console.error('listInvoices error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
