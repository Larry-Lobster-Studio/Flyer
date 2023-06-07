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
	//* Get company
	app.get('/v1/company', {
		schema: schemas.GetCompanySchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getCompany,
	});

	//* Update company
	app.put('/v1/company', {
		schema: schemas.UpdateCompanySchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.updateCompany,
	});

	done();
}

export default privateRoutes;
