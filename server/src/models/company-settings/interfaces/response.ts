import { Static, Type } from '@fastify/type-provider-typebox';

export const GetCompanySettingsResponse = Type.Object({
	currency: Type.String(),
	time_zone: Type.String(),
	language: Type.String(),
	date_format: Type.String(),
	fiscal_year: Type.String(),
	tax_per_item: Type.Boolean(),
	discount_per_item: Type.Boolean(),
	invoice_format: Type.String(),
});

export type GetCompanyResponseType = Static<typeof GetCompanySettingsResponse>;
