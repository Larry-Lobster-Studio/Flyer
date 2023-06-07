import { Prisma } from '@prisma/client';

interface IFilterExpenses {
	search?: string;
	company_id: string;
}

export function filterExpenses({ search, company_id }: IFilterExpenses) {
	return Prisma.validator<Prisma.ExpenseWhereInput>()({
		company_id,
		OR: search
			? [
					{
						notes: {
							contains: search,
							mode: 'insensitive',
						},
					},
			  ]
			: undefined,
	});
}

export const expenseSelect = Prisma.validator<Prisma.ExpenseSelect>()({
	id: true,
	sub_total: true,
	tax_amount: true,
	total: true,
	due_date: true,
	currency: true,
	status: true,
	notes: true,
	terms: true,
	items: true,
	contact: {
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
	},
});
