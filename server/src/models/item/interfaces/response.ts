import { Nullable } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';

export const ListItemsResponse = Type.Object({
	object: Type.String(),
	has_more: Type.Boolean(),
	total: Type.Integer(),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.String(),
			price: Type.String(),
			description: Nullable(Type.String()),
			unit: Type.String(),
			tax: Type.String(),
		})
	),
});

export const GetItemResponse = Type.Object({
	id: Type.String(),
	name: Type.String(),
	price: Type.String(),
	description: Nullable(Type.String()),
	unit: Type.String(),
	tax: Type.String(),
});

export type ListItemsResponseType = Static<typeof ListItemsResponse>;
export type GetItemResponseType = Static<typeof GetItemResponse>;
