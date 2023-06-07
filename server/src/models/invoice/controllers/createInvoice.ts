import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { format } from 'date-fns';
import { dinero, add, multiply } from 'dinero.js';

import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import {
	convertDecimalToScale,
	createId,
	convertScaleToDecimal,
	createInvoiceFile,
	getCurrency,
	currencyObject,
	currencyString,
} from '@/utils';
import { CreateInvoiceSchema } from '../schemas';
import { config } from '@/config/main.config';
import { invoiceSelect } from '../validators';

export async function createInvoice(
	request: FastifyRequestTypebox<typeof CreateInvoiceSchema>,
	reply: FastifyReplyTypebox<typeof CreateInvoiceSchema>
) {
	const { company_id }: UserSession = request['user-session'];
	const {
		contact,
		due_date,
		invoice_date,
		invoice_number,
		items,
		notes,
		reference_number,
		template,
	} = request.body;
	try {
		const currency = await getCurrency({ companyId: company_id });
		const invoiceItems = items.map((item) => {
			const price = dinero({ amount: item.price, currency });
			const quantity = convertDecimalToScale(item.quantity);
			const subTotal = multiply(price, quantity);
			const tax = convertDecimalToScale(item.tax);
			const tax_amount = multiply(subTotal, tax);
			const total = add(subTotal, tax_amount);
			return {
				name: item.name,
				price: currencyObject(price),
				description: item.description,
				tax,
				tax_amount: currencyObject(tax_amount),
				sub_total: currencyObject(subTotal),
				total: currencyObject(total),
				quantity,
			};
		});

		let dTotalTaxAmount = dinero({ amount: 0, currency });
		let dSubTotal = dinero({ amount: 0, currency });
		let dTotal = dinero({ amount: 0, currency });

		for await (const item of invoiceItems) {
			const { total, sub_total, tax_amount } = item;

			dTotalTaxAmount = add(dTotalTaxAmount, dinero(tax_amount));
			dSubTotal = add(dSubTotal, dinero(sub_total));
			dTotal = add(dTotal, dinero(total));
		}

		const invoice = await prisma.invoice.create({
			data: {
				id: createId('inv'),
				invoice_number,
				reference_number,
				currency: currency.code,
				due_date: new Date(due_date),
				invoice_date: new Date(invoice_date),
				notes,
				sub_total: currencyObject(dSubTotal),
				tax_amount: currencyObject(dTotalTaxAmount),
				total: currencyObject(dTotal),
				outstanding_amount: currencyObject(dTotal),
				paid_amount: currencyObject(dinero({ amount: 0, currency })),
				items: {
					createMany: {
						data: invoiceItems,
					},
				},
				company: {
					connect: {
						id: company_id,
					},
				},
				contact: {
					connect: {
						id: contact,
					},
				},
			},
			select: invoiceSelect,
		});

		const data = {
			...invoice,
			sub_total: currencyString(invoice.sub_total as any),
			tax_amount: currencyString(invoice.tax_amount as any),
			total: currencyString(invoice.total as any),
			invoice_date: invoice.invoice_date.toISOString(),
			due_date: invoice.due_date.toISOString(),
			items: invoice.items.map((item) => {
				return {
					...item,
					price: currencyString(item.price as any),
					quantity: convertScaleToDecimal(item.quantity as any).toString(),
					tax: (convertScaleToDecimal(item.tax as any) * 100).toString(),
					tax_amount: currencyString(item.tax_amount as any),
					sub_total: currencyString(item.sub_total as any),
					total: currencyString(item.total as any),
				};
			}),
		};

		const fileData = {
			invoice_number: data.invoice_number,
			invoice_date: format(new Date(data.invoice_date), 'dd MMMM yyy'),
			due_date: format(new Date(data.due_date), 'dd MMMM yyy'),
			sub_total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: currency.code,
			}).format(Number(data.sub_total)),
			tax_amount: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: currency.code,
			}).format(Number(data.tax_amount)),
			total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: currency.code,
			}).format(Number(data.total)),
			notes: data.notes ?? '',
			contact: {
				name: data.contact.name,
				email: data.contact.email,
				vat: data.contact.vat,
				billing: {
					line_1: data.contact.billing_address?.line_1 ?? '',
					line_2: data.contact.billing_address?.line_2 ?? '',
					postal_code: data.contact.billing_address?.postal_code ?? '',
					city: data.contact.billing_address?.city ?? '',
					country: data.contact.billing_address?.country ?? '',
				},
			},
			items: data.items.map((i, index) => {
				return {
					price: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: currency.code,
					}).format(Number(i.price)),
					name: i.name,
					description: i.description ?? '',
					number: (index + 1).toString().padStart(2, '0'),
					quantity: i.quantity,
					sub_total: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: currency.code,
					}).format(Number(i.sub_total)),
					tax: `${i.tax}%`,
					tax_amount: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: currency.code,
					}).format(Number(i.tax_amount)),
				};
			}),
		};

		const document = await createInvoiceFile({
			companyId: company_id,
			invoice: fileData,
			templateId: template,
		});

		return reply.status(201).send({
			...data,
			document: {
				id: document.id,
				file_name: document.file_name,
				url: `${config.server_url}/v1/files/${document.id}/contents`,
			},
		});
	} catch (error) {
		console.error('createInvoice error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
