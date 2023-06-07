import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { format } from 'date-fns';

import { GetExpenseSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { expenseSelect } from '../validators';
import { currencyString } from '@/utils';
import { config } from '@/config/main.config';

export async function getExpense(
	request: FastifyRequestTypebox<typeof GetExpenseSchema>,
	reply: FastifyReplyTypebox<typeof GetExpenseSchema>
) {
	const { expenseId } = request.params;
	try {
		const expense = await prisma.expense.findUnique({
			where: {
				id: expenseId,
			},
			select: {
				...expenseSelect,
				document: {
					select: {
						id: true,
						file_name: true,
					},
				},
			},
		});

		if (!expense)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send({
			...expense,
			tax_amount: currencyString(expense.tax_amount),
			sub_total: currencyString(expense.sub_total),
			total: currencyString(expense.total),
			due_date:
				expense.due_date && format(new Date(expense.due_date), 'dd MMMM yyy'),
			items: expense.items.map((item) => ({
				...item,
				sub_total: currencyString(item.sub_total),
				total: currencyString(item.total),
				tax_amount: currencyString(item.tax_amount),
			})),
			document: expense.document
				? {
						id: expense.document!.id,
						file_name: expense.document!.file_name,
						url: `${config.server_url}/v1/files/${
							expense.document!.id
						}/contents`,
				  }
				: null,
		});
	} catch (error) {
		console.error('getExpense error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
