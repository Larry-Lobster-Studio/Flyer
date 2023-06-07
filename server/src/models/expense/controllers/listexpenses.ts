import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { ListExpensesSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { filterExpenses } from '../validators';
import { currencyString } from '@/utils';

export async function listExpenses(
	request: FastifyRequestTypebox<typeof ListExpensesSchema>,
	reply: FastifyReplyTypebox<typeof ListExpensesSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { page, per_page, search, sort } = request.query;
	try {
		const total = await prisma.expense.count({
			where: filterExpenses({ search, company_id }),
		});
		const expenses = await prisma.expense.findMany({
			where: filterExpenses({ search, company_id }),
			skip: per_page! * page!,
			take: per_page!,
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
				total: true,
				currency: true,
				status: true,
				contact: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
			},
		});

		const mExpenses = expenses.map((exp) => {
			return {
				...exp,
				total: currencyString(exp.total),
			};
		});

		return reply.status(200).send({
			object: 'list',
			has_more: per_page! * (page ?? 0) + per_page! < total ? true : false,
			total,
			items: mExpenses,
		});
	} catch (error) {
		console.error('listExpenses error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
