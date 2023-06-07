import { AddressPayload } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';

export const CreateContactBody = Type.Object({
	name: Type.String(),
	email: Type.String({ format: 'email' }),
	phone: Type.Optional(Type.String()),
	website: Type.Optional(Type.String()),
	vat: Type.String(),
	billing_address: Type.Optional(AddressPayload),
	shipping_address: Type.Optional(AddressPayload),
});

export type CreateContactBodyType = Static<typeof CreateContactBody>;

export const UpdateContactBody = Type.Object({
	name: Type.Optional(Type.String()),
	email: Type.Optional(Type.String({ format: 'email' })),
	phone: Type.Optional(Type.String()),
	website: Type.Optional(Type.String()),
	vat: Type.Optional(Type.String()),
	billing_address: Type.Optional(AddressPayload),
	shipping_address: Type.Optional(AddressPayload),
});

export type UpdateContactBodyType = Static<typeof UpdateContactBody>;
