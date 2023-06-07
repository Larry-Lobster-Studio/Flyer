import { AddressPayload } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';

export const UpdateCompanyBody = Type.Object({
	name: Type.Optional(Type.String()),
	logo: Type.Optional(Type.String()),
	phone: Type.Optional(Type.String()),
	address: Type.Optional(AddressPayload),
});

export type UpdateCompanyBodyType = Static<typeof UpdateCompanyBody>;
