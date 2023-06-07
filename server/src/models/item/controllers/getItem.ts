import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';
import type { Dinero } from 'dinero.js';

import { toDecimal, dinero } from 'dinero.js';

import { GetItemSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { convertScaleToDecimal } from '@/utils';

export async function getItem(
	request: FastifyRequestTypebox<typeof GetItemSchema>,
	reply: FastifyReplyTypebox<typeof GetItemSchema>
) {
	const { itemId } = request.params;
	try {
		const item = await prisma.item.findUnique({
			where: {
				id: itemId,
			},
			select: {
				id: true,
				name: true,
				price: true,
				description: true,
				unit: true,
				tax: true,
			},
		});

		if (!item)
			return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);

		return reply.status(200).send({
			...item,
			price: toDecimal(dinero(item.price as any)),
			tax: convertScaleToDecimal(item.tax as any).toString(),
		});
	} catch (error) {
		console.error('getItem error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
