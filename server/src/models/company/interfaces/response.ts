import { AddressResponse, Nullable } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';

export const ListCompaniesResponse = Type.Object({
	object: Type.String(),
	has_more: Type.Boolean(),
	total: Type.Integer(),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.String(),
		})
	),
});

export type ListCompaniesResponseType = Static<typeof ListCompaniesResponse>;

export const GetCompanyResponse = Type.Object({
	id: Type.String(),
	name: Type.String(),
	phone: Nullable(Type.String()),
	logo: Nullable(
		Type.Object({
			id: Type.String(),
			file_name: Type.String(),
			url: Type.String(),
		})
	),
	address: Nullable(AddressResponse),
});

export type GetCompanyResponseType = Static<typeof GetCompanyResponse>;
