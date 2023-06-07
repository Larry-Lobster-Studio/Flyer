import type { Prisma } from '@prisma/client';
import type { Dinero } from 'dinero.js';
import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { toDecimal, dinero, toSnapshot, trimScale } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';

import { CreateItemSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { convertDecimalToScale, convertScaleToDecimal } from '@/utils';

export async function createItem(
	request: FastifyRequestTypebox<typeof CreateItemSchema>,
	reply: FastifyReplyTypebox<typeof CreateItemSchema>
) {
	const { company_id }: UserSession = request['user-session'];

	const { name, price, description, unit, tax } = request.body;
	try {
		const item = await prisma.item.create({
			data: {
				name,
				description,
				price: toSnapshot(trimScale(dinero({ amount: price, currency: EUR }))),
				tax: convertDecimalToScale(tax),
				unit,
				company: {
					connect: {
						id: company_id,
					},
				},
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

		return reply.status(201).send({
			...item,
			price: toDecimal(dinero(item.price as any)),
			tax: convertScaleToDecimal(item.tax as any).toString(),
		});
	} catch (error) {
		console.error('createItem error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
