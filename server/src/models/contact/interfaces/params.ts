import { Static, Type } from '@fastify/type-provider-typebox';

export const ContactParams = Type.Object({
	contactId: Type.String(),
});

export type ContactParamsType = Static<typeof ContactParams>;
