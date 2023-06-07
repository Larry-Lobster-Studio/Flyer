import { Static, Type } from '@fastify/type-provider-typebox';

export const UpdateCompanySettingsBody = Type.Object({
	currency: Type.Optional(Type.String()),
	time_zone: Type.Optional(Type.String()),
	language: Type.Optional(Type.String()),
	date_format: Type.Optional(Type.String()),
	fiscal_year: Type.Optional(Type.String()),
	tax_per_item: Type.Optional(Type.Boolean()),
	discount_per_item: Type.Optional(Type.Boolean()),
	invoice_format: Type.Optional(Type.String()),
});

export type UpdateCompanySettingsBodyType = Static<
	typeof UpdateCompanySettingsBody
>;
