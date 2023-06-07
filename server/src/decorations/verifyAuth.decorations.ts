import type {
	FastifyRequest,
	FastifyReply,
	HookHandlerDoneFunction,
} from 'fastify';
import type { AxiosError } from 'axios';

import prisma from '@/providers/database/prisma';
import { ory } from '@/providers/authentication';

import errors from '@/common/errors';

export async function verifyAuth(
	request: FastifyRequest,
	reply: FastifyReply,
	_done: HookHandlerDoneFunction
) {
	try {
		return ory
			.toSession({ cookie: request.headers.cookie })
			.then(async ({ data }) => {
				const dbUser = await prisma.user.findUnique({
					where: {
						id: data.identity.id,
					},
					select: {
						id: true,
						company_id: true,
					},
				});

				if (dbUser) {
					return (request['user-session'] = {
						...data,
						company_id: dbUser.company_id,
					});
				} else
					return reply
						.status(errors.NOT_AUTHENTICATED.status)
						.send(errors.NOT_AUTHENTICATED);
			})
			.catch((err: AxiosError) => {
				console.log('ory saas error: ', err.message, err.status);
				return reply
					.status(errors.NOT_AUTHENTICATED.status)
					.send(errors.NOT_AUTHENTICATED);
			});
	} catch (error) {
		console.error('verify auth error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
