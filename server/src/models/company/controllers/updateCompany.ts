import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { UpdateCompanySchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { createId, getAddress } from '@/utils';
import { config } from '@/config/main.config';

export async function updateCompany(
	request: FastifyRequestTypebox<typeof UpdateCompanySchema>,
	reply: FastifyReplyTypebox<typeof UpdateCompanySchema>
) {
	const { company_id }: UserSession = request['user-session'];

	const { name, logo, phone, address } = request.body;
	try {
		const company = await prisma.company.update({
			where: {
				id: company_id,
			},
			data: {
				id: createId('comp'),
				name,
				phone,
				address: address && {
					create: {
						...(await getAddress(address)),
					},
				},
				logo: {
					connect: {
						id: logo,
					},
				},
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

		return reply.status(201).send(data);
	} catch (error) {
		console.error('updateCompany error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
