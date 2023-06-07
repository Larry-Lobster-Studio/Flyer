import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { GetNextInvoiceNumberSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { generateInvoiceNumber } from '@/utils';

export async function getNextInvoiceNumber(
	request: FastifyRequestTypebox<typeof GetNextInvoiceNumberSchema>,
	reply: FastifyReplyTypebox<typeof GetNextInvoiceNumberSchema>
) {
	const { company_id }: UserSession = request['user-session'];

	try {
		const companySettings = await prisma.companySettings.findUnique({
			where: {
				company_id,
			},
		});

		if (!companySettings)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		const totalInvoices = await prisma.invoice.count({
			where: {
				company_id,
			},
		});

		const template = companySettings.invoice_format;

		return reply.status(200).send({
			number: generateInvoiceNumber(template, totalInvoices),
		});
	} catch (error) {
		console.error('getNextInvoiceNumber error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
