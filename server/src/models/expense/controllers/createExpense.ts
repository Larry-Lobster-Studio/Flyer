import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { add, dinero, subtract } from 'dinero.js';
import * as dCurrencies from '@dinero.js/currencies';
import { format } from 'date-fns';

import { CreateExpenseSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { createId, currencyObject, currencyString } from '@/utils';
import { expenseSelect } from '../validators';
import { config } from '@/config/main.config';

export async function createExpense(
	request: FastifyRequestTypebox<typeof CreateExpenseSchema>,
	reply: FastifyReplyTypebox<typeof CreateExpenseSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const { contact, due_date, expense_date, paid_date, items, ...rest } =
		request.body;
	try {
		const currency = dCurrencies[rest.currency];
		const expenseItems = items.map((item) => {
			const subTotal = dinero({ amount: item.sub_total, currency });
			const total = dinero({ amount: item.total, currency });
			const taxAmount = subtract(total, subTotal);
			return {
				category: item.category,
				description: item.description,
				metadata: item.metadata,
				sub_total: currencyObject(subTotal),
				total: currencyObject(total),
				tax_amount: currencyObject(taxAmount),
			};
		});

		let dTotalTaxAmount = dinero({ amount: 0, currency });
		let dSubTotal = dinero({ amount: 0, currency });
		let dTotal = dinero({ amount: 0, currency });

		for await (const item of expenseItems) {
			const { total, sub_total, tax_amount } = item;

			dTotalTaxAmount = add(dTotalTaxAmount, dinero(tax_amount));
			dSubTotal = add(dSubTotal, dinero(sub_total));
			dTotal = add(dTotal, dinero(total));
		}

		const dPayed = dinero({
			amount: rest.paid_amount ?? 0,
			currency,
		});
		const dOutstanding = subtract(dTotal, dPayed);

		const expense = await prisma.expense.create({
			data: {
				id: createId('exp'),
				due_date: due_date ? new Date(due_date) : undefined,
				expense_date: new Date(expense_date),
				paid_date: paid_date ? new Date(paid_date) : undefined,
				currency: rest.currency,
				outstanding_amount: currencyObject(dOutstanding),
				paid_amount: currencyObject(dPayed),
				sub_total: currencyObject(dSubTotal),
				tax_amount: currencyObject(dTotalTaxAmount),
				total: currencyObject(dTotal),
				notes: rest.notes,
				status: rest.status,
				terms: rest.terms,
				contact: {
					connect: {
						id: contact,
					},
				},
				company: {
					connect: {
						id: company_id,
					},
				},
				items: {
					createMany: {
						data: expenseItems,
					},
				},
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

		return reply.status(201).send({
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
		console.error('createExpense error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
