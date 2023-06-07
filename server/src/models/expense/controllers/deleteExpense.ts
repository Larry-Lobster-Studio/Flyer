import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { DeleteExpenseSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function deleteExpense(
	request: FastifyRequestTypebox<typeof DeleteExpenseSchema>,
	reply: FastifyReplyTypebox<typeof DeleteExpenseSchema>
) {
	const { expenseId } = request.params;
	try {
		const expense = await prisma.expense.delete({
			where: {
				id: expenseId,
			},
		});

		if (!expense)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send({
			id: expense.id,
			object: 'expense',
			deleted: true,
		});
	} catch (error) {
		console.error('deleteExpense error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
