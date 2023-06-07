import { AddressResponse, Nullable } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';

export const ListContactsResponse = Type.Object({
	object: Type.String(),
	has_more: Type.Boolean(),
	total: Type.Integer(),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.String(),
			email: Type.String(),
			vat: Type.String(),
		})
	),
});

export type ListContactsResponseType = Static<typeof ListContactsResponse>;

export const GetContactResponse = Type.Object({
	id: Type.String(),
	name: Type.String(),
	email: Type.String(),
	phone: Nullable(Type.String()),
	vat: Type.String(),
	website: Nullable(Type.String()),
	billing_address: Nullable(AddressResponse),
	shipping_address: Nullable(AddressResponse),
});

export type GetContactResponseType = Static<typeof GetContactResponse>;
