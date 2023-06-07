import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { DeleteInvoiceSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function deleteInvoice(
	request: FastifyRequestTypebox<typeof DeleteInvoiceSchema>,
	reply: FastifyReplyTypebox<typeof DeleteInvoiceSchema>
) {
	const { invoiceId } = request.params;
	try {
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
		});

		if (!invoice)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		if (invoice.status !== 'DRAFT') {
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
		}

		return reply.status(200).send({
			id: invoice.id,
			object: 'invoice',
			deleted: true,
		});
	} catch (error) {
		console.error('deleteInvoice error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
