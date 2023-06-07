import { Static, Type } from '@fastify/type-provider-typebox';

export const ExpenseParams = Type.Object({
	expenseId: Type.String(),
});

export type ExpenseParamsType = Static<typeof ExpenseParams>;
