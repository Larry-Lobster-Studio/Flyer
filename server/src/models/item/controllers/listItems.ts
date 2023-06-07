import type { Dinero } from 'dinero.js';
import type {
	FastifyReplyTypebox,
	FastifyRequestTypebox,
	UserSession,
} from '@/common/types';

import { toDecimal, dinero } from 'dinero.js';

import { ListItemsSchema } from '../schemas';
import errors from '@/common/errors';
import prisma from '@/providers/database/prisma';
import { convertScaleToDecimal } from '@/utils';

export async function listItems(
	request: FastifyRequestTypebox<typeof ListItemsSchema>,
	reply: FastifyReplyTypebox<typeof ListItemsSchema>
) {
	const { company_id }: UserSession = request['user-session'];

	const { page, per_page, search, sort } = request.query;
	try {
		const total = await prisma.item.count({
			where: {
				company_id,
				OR: search
					? [
							{
								name: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								description: {
									contains: search,
									mode: 'insensitive',
								},
							},
					  ]
					: undefined,
			},
		});
		const items = await prisma.item.findMany({
			where: {
				company_id,
				OR: search
					? [
							{
								name: {
									contains: search,
									mode: 'insensitive',
								},
							},
							{
								description: {
									contains: search,
									mode: 'insensitive',
								},
							},
					  ]
					: undefined,
			},
			skip: per_page! * page!,
			take: per_page!,
			orderBy: {
				created_at: 'desc',
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

		const dItems = items.map((item) => {
			return {
				...item,
				price: toDecimal(dinero(item.price as any)),
				tax: convertScaleToDecimal(item.tax as any).toString(),
			};
		});

		return reply.status(200).send({
			object: 'list',
			has_more: per_page! * (page ?? 0) + per_page! < total ? true : false,
			total,
			items: dItems,
		});
	} catch (error) {
		console.error('listItems error: ', error);
		return reply.status(errors.SERVER_ERROR.status).send(errors.SERVER_ERROR);
	}
}
