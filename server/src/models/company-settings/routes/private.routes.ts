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
	//* Update company settings
	app.post('/v1/company/settings', {
		schema: schemas.UpdateCompanySettingsSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.updateCompanySettings,
	});

	//* Get company settings
	app.get('/v1/company/settings', {
		schema: schemas.GetCompanySettingsSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getCompanySettings,
	});

	done();
}

export default privateRoutes;
