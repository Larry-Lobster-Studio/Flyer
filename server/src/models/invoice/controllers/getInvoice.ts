import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { toDecimal, dinero } from 'dinero.js';

import { GetInvoiceSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { convertScaleToDecimal } from '@/utils';
import { config } from '@/config/main.config';
import { invoiceSelect } from '../validators';

export async function getInvoice(
	request: FastifyRequestTypebox<typeof GetInvoiceSchema>,
	reply: FastifyReplyTypebox<typeof GetInvoiceSchema>
) {
	const { invoiceId } = request.params;
	try {
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
			select: {
				...invoiceSelect,
				document: {
					select: {
						id: true,
						file_name: true,
					},
				},
			},
		});

		if (!invoice)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

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
					tax: convertScaleToDecimal(item.tax as any).toString(),
					tax_amount: toDecimal(dinero(item.tax_amount as any)),
					sub_total: toDecimal(dinero(item.sub_total as any)),
					total: toDecimal(dinero(item.total as any)),
				};
			}),
			document: {
				id: invoice.document!.id,
				file_name: invoice.document!.file_name,
				url: `${config.server_url}/v1/files/${invoice.document!.id}/contents`,
			},
		};

		return reply.status(200).send(data);
	} catch (error) {
		console.error('getInvoice error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
