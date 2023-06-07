import { Static, Type } from '@fastify/type-provider-typebox';
import { ExpenseStatus } from '@prisma/client';

export const CreateExpenseBody = Type.Object({
	contact: Type.String(),
	status: Type.Enum(ExpenseStatus),
	currency: Type.String(),
	paid_amount: Type.Optional(Type.Integer({ minimum: 0 })),
	notes: Type.Optional(Type.String()),
	terms: Type.Optional(Type.String()),
	expense_date: Type.String({ format: 'date' }),
	due_date: Type.Optional(Type.String({ format: 'date' })),
	paid_date: Type.Optional(Type.String({ format: 'date' })),
	document: Type.Optional(Type.String()),
	items: Type.Array(
		Type.Object({
			category: Type.String(),
			description: Type.Optional(Type.String()),
			metadata: Type.Optional(Type.Object({})),
			sub_total: Type.Integer({ minimum: 0 }),
			total: Type.Integer({ minimum: 0 }),
		})
	),
});

export type CreateExpenseBodyType = Static<typeof CreateExpenseBody>;

export const UpdateExpenseBody = Type.Object({
	contact: Type.Optional(Type.String()),
	status: Type.Optional(Type.Enum(ExpenseStatus)),
	currency: Type.Optional(Type.String()),
	paid_amount: Type.Optional(Type.Integer({ minimum: 0 })),
	notes: Type.Optional(Type.String()),
	terms: Type.Optional(Type.String()),
	expense_date: Type.Optional(Type.String({ format: 'date' })),
	due_date: Type.Optional(Type.String({ format: 'date' })),
	paid_date: Type.Optional(Type.String({ format: 'date' })),
	document: Type.Optional(Type.String()),
	items: Type.Optional(
		Type.Array(
			Type.Object({
				category: Type.String(),
				description: Type.Optional(Type.String()),
				metadata: Type.Optional(Type.Object({})),
				sub_total: Type.Integer({ minimum: 0 }),
				total: Type.Integer({ minimum: 0 }),
			})
		)
	),
});

export type UpdateExpenseBodyType = Static<typeof UpdateExpenseBody>;
