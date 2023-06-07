import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { format } from 'date-fns';
import { dinero, add, multiply, toDecimal, trimScale } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';

import { InvoicePreviewSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import {
	convertDecimalToScale,
	convertScaleToDecimal,
	createInvoiceFile,
} from '@/utils';
import { privateAssetUrl } from '@/providers/storage/objects';

export async function getPreview(
	request: FastifyRequestTypebox<typeof InvoicePreviewSchema>,
	reply: FastifyReplyTypebox<typeof InvoicePreviewSchema>
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
		const invoiceItems = items.map((item) => {
			const price = dinero({ amount: item.price, currency: EUR });
			const quantity = convertDecimalToScale(item.quantity);
			const subTotal = multiply(price, quantity);
			const tax = convertDecimalToScale(item.tax);
			const tax_amount = multiply(subTotal, tax);
			const total = add(subTotal, tax_amount);
			return {
				name: item.name,
				price: trimScale(price),
				description: item.description,
				tax,
				tax_amount: trimScale(tax_amount),
				sub_total: trimScale(subTotal),
				total: trimScale(total),
				quantity,
			};
		});

		let dTotalTaxAmount = dinero({ amount: 0, currency: EUR });
		let dSubTotal = dinero({ amount: 0, currency: EUR });
		let dTotal = dinero({ amount: 0, currency: EUR });

		for await (const item of invoiceItems) {
			const { total, sub_total, tax_amount } = item;

			dTotalTaxAmount = add(dTotalTaxAmount, tax_amount);
			dSubTotal = add(dSubTotal, sub_total);
			dTotal = add(dTotal, total);
		}

		const dbContact = await prisma.contact.findUnique({
			where: {
				id: contact,
			},
			include: {
				billing_address: true,
			},
		});

		if (!dbContact)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		const fileData = {
			invoice_number,
			invoice_date: format(new Date(invoice_date), 'dd MMMM yyy'),
			due_date: format(new Date(due_date), 'dd MMMM yyy'),
			sub_total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
			}).format(Number(toDecimal(dSubTotal))),
			tax_amount: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
			}).format(Number(toDecimal(dTotalTaxAmount))),
			total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
			}).format(Number(toDecimal(dTotal))),
			notes: notes ?? '',
			contact: {
				name: dbContact.name,
				email: dbContact.email,
				vat: dbContact.vat,
				billing: {
					line_1: dbContact.billing_address?.line_1 ?? '',
					line_2: dbContact.billing_address?.line_2 ?? '',
					postal_code: dbContact.billing_address?.postal_code ?? '',
					city: dbContact.billing_address?.city ?? '',
					country: dbContact.billing_address?.country ?? '',
				},
			},
			items: invoiceItems.map((i, index) => {
				return {
					price: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
					}).format(Number(toDecimal(i.price))),
					name: i.name,
					description: i.description ?? '',
					number: (index + 1).toString().padStart(2, '0'),
					quantity: convertScaleToDecimal(i.quantity).toString(),
					sub_total: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
					}).format(Number(toDecimal(i.sub_total))),
					tax: `${convertScaleToDecimal(i.tax) * 100}%`,
					tax_amount: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
					}).format(Number(toDecimal(i.tax_amount))),
				};
			}),
		};

		const { key, bucket } = await createInvoiceFile({
			companyId: company_id,
			invoice: fileData,
			temporary: true,
			templateId: template,
		});

		const url = await privateAssetUrl(bucket, key);

		return reply.status(200).send(url);
	} catch (error) {
		console.error('getPreview error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
