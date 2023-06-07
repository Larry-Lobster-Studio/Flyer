import type Mail from 'nodemailer/lib/mailer';
import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { SendInvoiceSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import sendMail from '@/providers/mail';
import { getObject } from '@/providers/storage/objects';

export async function sendInvoice(
	request: FastifyRequestTypebox<typeof SendInvoiceSchema>,
	reply: FastifyReplyTypebox<typeof SendInvoiceSchema>
) {
	const { invoiceId } = request.params;
	const { mark_sent, resend } = request.body;
	try {
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
			select: {
				id: true,
				invoice_number: true,
				status: true,
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
					},
				},
				document: {
					select: {
						id: true,
						file_name: true,
						bucket: true,
						key: true,
					},
				},
			},
		});

		if (!invoice)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		if (invoice.status === 'SENT' && mark_sent)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
		if (invoice.status === 'SENT' && !resend)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		if (mark_sent) {
			await prisma.invoice.update({
				where: {
					id: invoiceId,
				},
				data: {
					status: 'SENT',
				},
			});
		}

		if (resend || (invoice.status === 'DRAFT' && !mark_sent && !resend)) {
			let attachments: Mail.Attachment[] | undefined;

			if (invoice.document) {
				const { body, metadata } = await getObject(
					invoice.document.bucket,
					invoice.document.key
				);

				attachments = [
					{
						filename: invoice.document.file_name,
						content: body,
					},
				];
			}

			sendMail({
				from: 'no-reply@flyer.io',
				to: invoice.contact.email,
				subject: `Payment request for invoice ${invoice.invoice_number}.`,
				text: 'Please find the invoice in attachment.',
				attachments,
			});

			await prisma.invoice.update({
				where: {
					id: invoiceId,
				},
				data: {
					status: 'SENT',
				},
			});
		}

		return reply.status(201).send();
	} catch (error) {
		console.error('sendInvoice error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
