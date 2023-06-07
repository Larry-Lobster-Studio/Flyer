import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { GetCompanySettingsSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';

export async function getCompanySettings(
	request: FastifyRequestTypebox<typeof GetCompanySettingsSchema>,
	reply: FastifyReplyTypebox<typeof GetCompanySettingsSchema>
) {
	const { company_id }: UserSession = request['user-session'];

	console.debug('company_id: ', company_id);

	try {
		const settings = await prisma.companySettings.findUnique({
			where: {
				company_id,
			},
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

		if (!settings)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send(settings);
	} catch (error) {
		console.error('getCompanySettings error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
