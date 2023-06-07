import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { format } from 'date-fns';
import {
	dinero,
	add,
	multiply,
	toSnapshot,
	toDecimal,
	trimScale,
} from 'dinero.js';
import { EUR } from '@dinero.js/currencies';

import { UpdateInvoiceSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import {
	convertDecimalToScale,
	convertScaleToDecimal,
	createInvoiceFile,
} from '@/utils';
import { invoiceSelect } from '../validators';
import { config } from '@/config/main.config';

export async function updateInvoice(
	request: FastifyRequestTypebox<typeof UpdateInvoiceSchema>,
	reply: FastifyReplyTypebox<typeof UpdateInvoiceSchema>
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
		const currInvoice = await prisma.invoice.findUnique({
			where: {
				id: request.params.invoiceId,
			},
		});

		if (!currInvoice)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		if (currInvoice.status !== 'DRAFT')
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		let invoiceItems: any[] | undefined = undefined;
		let dTotalTaxAmount = dinero({ amount: 0, currency: EUR });
		let dSubTotal = dinero({ amount: 0, currency: EUR });
		let dTotal = dinero({ amount: 0, currency: EUR });

		if (items) {
			invoiceItems = items?.map((item) => {
				const price = dinero({ amount: item.price, currency: EUR });
				const quantity = convertDecimalToScale(item.quantity);
				const subTotal = multiply(price, quantity);
				const tax = convertDecimalToScale(item.tax);
				const tax_amount = multiply(subTotal, tax);
				const total = add(subTotal, tax_amount);
				return {
					name: item.name,
					price: toSnapshot(trimScale(price)),
					description: item.description,
					tax,
					tax_amount: toSnapshot(trimScale(tax_amount)),
					sub_total: toSnapshot(trimScale(subTotal)),
					total: toSnapshot(trimScale(total)),
					quantity,
				};
			});

			for await (const item of invoiceItems) {
				const { total, sub_total, tax_amount } = item;

				dTotalTaxAmount = add(dTotalTaxAmount, dinero(tax_amount));
				dSubTotal = add(dSubTotal, dinero(sub_total));
				dTotal = add(dTotal, dinero(total));
			}
		}

		const invoice = await prisma.invoice.update({
			where: {
				id: currInvoice.id,
			},
			data: {
				invoice_number,
				reference_number,
				currency: 'EUR',
				due_date: due_date ? new Date(due_date) : undefined,
				invoice_date: invoice_date ? new Date(invoice_date) : undefined,
				notes,
				sub_total: invoiceItems ? toSnapshot(trimScale(dSubTotal)) : undefined,
				tax_amount: invoiceItems
					? toSnapshot(trimScale(dTotalTaxAmount))
					: undefined,
				total: invoiceItems ? toSnapshot(trimScale(dTotal)) : undefined,
				items: invoiceItems
					? {
							createMany: {
								data: invoiceItems,
							},
					  }
					: undefined,
				company: {
					connect: {
						id: company_id,
					},
				},
				contact: contact
					? {
							connect: {
								id: contact,
							},
					  }
					: undefined,
			},
			select: invoiceSelect,
		});

		const data = {
			...invoice,
			sub_total: toDecimal(dinero(invoice.sub_total as any)),
			tax_amount: toDecimal(dinero(invoice.tax_amount as any)),
			total: toDecimal(dinero(invoice.total as any)),
			invoice_date: invoice.invoice_date.toISOString(),
			due_date: invoice.due_date.toISOString(),
			items: invoice.items.map((item) => {
				return {
					...item,
					price: toDecimal(dinero(item.price as any)),
					quantity: convertScaleToDecimal(item.quantity as any).toString(),
					tax: (convertScaleToDecimal(item.tax as any) * 100).toString(),
					tax_amount: toDecimal(dinero(item.tax_amount as any)),
					sub_total: toDecimal(dinero(item.sub_total as any)),
					total: toDecimal(dinero(item.total as any)),
				};
			}),
		};

		const fileData = {
			invoice_number: data.invoice_number,
			invoice_date: format(new Date(data.invoice_date), 'dd MMMM yyy'),
			due_date: format(new Date(data.due_date), 'dd MMMM yyy'),
			sub_total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
			}).format(Number(data.sub_total)),
			tax_amount: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
			}).format(Number(data.tax_amount)),
			total: new Intl.NumberFormat('be-NL', {
				style: 'currency',
				currency: 'EUR',
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
						currency: 'EUR',
					}).format(Number(i.price)),
					name: i.name,
					description: i.description ?? '',
					number: (index + 1).toString().padStart(2, '0'),
					quantity: i.quantity,
					sub_total: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
					}).format(Number(i.sub_total)),
					tax: `${i.tax}%`,
					tax_amount: new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
					}).format(Number(i.tax_amount)),
				};
			}),
		};

		const document = await createInvoiceFile({
			companyId: company_id,
			invoice: fileData,
			templateId: 'file_121',
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
		console.error('updateInvoice error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
