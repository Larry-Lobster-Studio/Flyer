import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { UpdateCompanySettingsSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function updateCompanySettings(
	request: FastifyRequestTypebox<typeof UpdateCompanySettingsSchema>,
	reply: FastifyReplyTypebox<typeof UpdateCompanySettingsSchema>
) {
	const { company_id }: UserSession = request['user-session'];

	try {
		const settings = await prisma.companySettings.update({
			where: {
				company_id,
			},
			data: request.body,
			select: {
				currency: true,
				time_zone: true,
				language: true,
				date_format: true,
				fiscal_year: true,
				tax_per_item: true,
				discount_per_item: true,
				invoice_format: true,
			},
		});

		return reply.status(201).send(settings);
	} catch (error) {
		console.error('updateCompanySettings error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
