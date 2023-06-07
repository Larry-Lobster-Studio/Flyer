import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { toDecimal, dinero, toSnapshot, trimScale } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';

import { UpdateItemSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { convertDecimalToScale, convertScaleToDecimal } from '@/utils';

export async function updateItem(
	request: FastifyRequestTypebox<typeof UpdateItemSchema>,
	reply: FastifyReplyTypebox<typeof UpdateItemSchema>
) {
	const { name, price, description, unit, tax } = request.body;
	try {
		const item = await prisma.item.update({
			where: {
				id: request.params.itemId,
			},
			data: {
				name,
				description,
				price: price
					? toSnapshot(trimScale(dinero({ amount: price, currency: EUR })))
					: undefined,
				tax: tax ? convertDecimalToScale(tax) : undefined,
				unit,
				company: {
					connect: {
						id: 'comp_SX2rWCeVBNGbTLb8mQNvP',
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
		console.error('updateItem error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
