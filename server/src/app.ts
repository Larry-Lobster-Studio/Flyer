import type { FastifyServerOptions } from 'fastify';
import type { FastifyCorsOptions } from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import fastify from 'fastify';

import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cookie from '@fastify/cookie';

import { config } from '@/config/main.config';

async function buildApp(opts: FastifyServerOptions = {}) {
	const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

	app
		// .register(helmet, {
		// 	global: true,
		// })
		.register(cors, (_instance) => {
			return (req, callback) => {
				let corsOptions: FastifyCorsOptions = config.cors.production;

				// do not include CORS headers for requests from localhost
				if (/(?:^localhost|.localhost)/m.test(req.headers.origin!)) {
					corsOptions.origin = config.cors.development.origin;
				}

				callback(null, corsOptions);
			};
		})
		.register(rateLimit, {
			global: false,
			max: 9000,
			timeWindow: '1 minute',
			// redis,
		})
		.register(cookie, {
			hook: false,
		})
		.register(multipart, {
			limits: {
				fields: 3,
				files: 1,
				fileSize: 31457280,
			},
			throwFileSizeLimit: true,
		})
		.register(swagger, config.swagger);

	if (config.environment === 'development') {
		app.register(swaggerUi, {
			routePrefix: '/documentation',
			uiConfig: { docExpansion: 'none', deepLinking: false },
		});
	}

	app
		.register(require('./models/company/routes'))
		.register(require('./models/company-settings/routes'))
		.register(require('./models/contact/routes'))
		.register(require('./models/item/routes'))
		.register(require('./models/file/routes'))
		.register(require('./models/invoice/routes'))
		.register(require('./models/expense/routes'));

	return app;
}

export default buildApp;
