import { Static, Type } from '@fastify/type-provider-typebox';

export const InvoiceParams = Type.Object({
	invoiceId: Type.String(),
});

export type InvoiceParamsType = Static<typeof InvoiceParams>;
