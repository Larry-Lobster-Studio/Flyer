import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { add, dinero, subtract } from 'dinero.js';
import * as dCurrencies from '@dinero.js/currencies';
import { format } from 'date-fns';

import { UpdateExpenseSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { currencyObject, currencyString } from '@/utils';
import { expenseSelect } from '../validators';
import { config } from '@/config/main.config';

export async function updateExpense(
	request: FastifyRequestTypebox<typeof UpdateExpenseSchema>,
	reply: FastifyReplyTypebox<typeof UpdateExpenseSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { expenseId } = request.params;
	const { contact, paid_date, due_date, expense_date, ...rest } = request.body;
	try {
		const currExpense = await prisma.expense.findUnique({
			where: {
				id: expenseId,
			},
		});

		if (!currExpense)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		const currency = rest.currency
			? dCurrencies[rest.currency]
			: currExpense.currency;

		let expenseItems: any[] = [];
		let dTotalTaxAmount = dinero(
			rest.items ? { amount: 0, currency } : currExpense.tax_amount
		);
		let dSubTotal = dinero(
			rest.items ? { amount: 0, currency } : currExpense.sub_total
		);
		let dTotal = dinero(
			rest.items ? { amount: 0, currency } : currExpense.total
		);
		if (rest.items) {
			expenseItems = rest.items.map((item) => {
				const subTotal = dinero({ amount: item.sub_total, currency });
				const total = dinero({ amount: item.total, currency });
				const taxAmount = subtract(total, subTotal);

				dTotalTaxAmount = add(dTotalTaxAmount, taxAmount);
				dSubTotal = add(dSubTotal, subTotal);
				dTotal = add(dTotal, total);

				return {
					category: item.category,
					description: item.description,
					metadata: item.metadata,
					sub_total: currencyObject(subTotal),
					total: currencyObject(total),
					tax_amount: currencyObject(taxAmount),
				};
			});
		}

		const dPayed = rest.paid_amount
			? dinero({
					amount: rest.paid_amount,
					currency: dCurrencies[currency],
			  })
			: dinero(currExpense.paid_amount);
		const dOutstanding = subtract(dTotal, dPayed);

		const expense = await prisma.expense.update({
			where: {
				id: expenseId,
			},
			data: {
				...rest,
				due_date: due_date ? new Date(due_date) : undefined,
				expense_date: expense_date ? new Date(expense_date) : undefined,
				paid_date: paid_date ? new Date(paid_date) : undefined,
				items: rest.items ? { set: expenseItems } : undefined,
				currency,
				outstanding_amount: currencyObject(dOutstanding),
				paid_amount: currencyObject(dPayed),
				sub_total: currencyObject(dSubTotal),
				tax_amount: currencyObject(dTotalTaxAmount),
				total: currencyObject(dTotal),
				contact: contact
					? {
							connect: {
								id: contact,
							},
					  }
					: undefined,
				document: rest.document
					? {
							connect: {
								id: rest.document,
							},
					  }
					: undefined,
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
		console.error('updateExpense error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
