import type {
	FastifyError,
	FastifyInstance,
	FastifyPluginOptions,
} from 'fastify';

import * as schemas from '../schemas';
import * as controllers from '../controllers';
import { sanitize, verifyAuth } from '@/decorations';

function privateRoutes(
	app: FastifyInstance,
	_: FastifyPluginOptions,
	done: (err?: FastifyError) => void
) {
	//* Create single company
	app.post('/v1/items', {
		schema: schemas.CreateItemSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.createItem,
	});

	//* Create single company
	app.put('/v1/items/:itemId', {
		schema: schemas.UpdateItemSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.updateItem,
	});

	//* Get item
	app.get('/v1/items/:itemId', {
		schema: schemas.GetItemSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getItem,
	});

	//* Delete item
	app.delete('/v1/items/:itemId', {
		schema: schemas.DeleteItemSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.deleteItem,
	});

	//* list items
	app.get('/v1/items', {
		schema: schemas.ListItemsSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.listItems,
	});

	done();
}

export default privateRoutes;
