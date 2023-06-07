import type {
	FastifyError,
	FastifyInstance,
	FastifyPluginOptions,
} from 'fastify';

import * as schema from '../schemas';
import * as controllers from '../controllers';
import { sanitize, verifyAuth } from '@/decorations';

export default function privateRoutes(
	app: FastifyInstance,
	_: FastifyPluginOptions,
	done: (err?: FastifyError) => void
) {
	//* Create single expense
	app.post('/v1/expenses', {
		schema: schema.CreateExpenseSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.createExpense,
	});

	//* Get expense
	app.get('/v1/expenses/:expenseId', {
		schema: schema.GetExpenseSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getExpense,
	});

	//* Update expense
	app.put('/v1/expenses/:expenseId', {
		schema: schema.UpdateExpenseSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.updateExpense,
	});

	//* Archive expense
	app.delete('/v1/expenses/:expenseId', {
		schema: schema.DeleteExpenseSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.deleteExpense,
	});

	//* list expenses
	app.get('/v1/expenses', {
		schema: schema.ListExpensesSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.listExpenses,
	});

	done();
}
