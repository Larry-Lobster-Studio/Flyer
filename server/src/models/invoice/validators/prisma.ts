import { Prisma } from '@prisma/client';

interface IFilterInvoices {
	search?: string;
	company_id: string;
}

export function filterInvoices({ search, company_id }: IFilterInvoices) {
	return Prisma.validator<Prisma.InvoiceWhereInput>()({
		company_id,
		contact: {
			name: { search },
		},
	});
}

export const invoiceSelect = Prisma.validator<Prisma.InvoiceSelect>()({
	id: true,
	invoice_number: true,
	reference_number: true,
	sub_total: true,
	tax_amount: true,
	total: true,
	invoice_date: true,
	due_date: true,
	currency: true,
	status: true,
	notes: true,
	items: {
		select: {
			id: true,
			name: true,
			price: true,
			quantity: true,
			tax: true,
			tax_amount: true,
			sub_total: true,
			total: true,
			description: true,
		},
	},
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
