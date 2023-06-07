import { Static, Type } from '@fastify/type-provider-typebox';

export const CompanyParams = Type.Object({
	companyId: Type.String(),
});

export type CompanyParamsType = Static<typeof CompanyParams>;
