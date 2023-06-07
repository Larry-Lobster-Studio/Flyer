import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import errors from '@/common/errors';
import { config } from '@/config/main.config';
import prisma from '@/providers/database/prisma';

import { GetCompanySchema } from '../schemas';

export async function getCompany(
	request: FastifyRequestTypebox<typeof GetCompanySchema>,
	reply: FastifyReplyTypebox<typeof GetCompanySchema>
) {
	const { company_id }: UserSession = request['user-session'];

	try {
		const company = await prisma.company.findUnique({
			where: {
				id: company_id,
			},
			select: {
				id: true,
				name: true,
				phone: true,
				logo: {
					select: {
						id: true,
						file_name: true,
					},
				},
				address: {
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
		});

		console.log('comp: ', company);

		if (!company)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		const data = {
			...company,
			logo: company.logo
				? {
						id: company.logo.id,
						file_name: company.logo.file_name,
						url: `${config.server_url}/v1/files/${company.logo.id}/contents`,
				  }
				: null,
		};

		return reply.status(200).send(data);
	} catch (error) {
		console.error('getCompany error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
