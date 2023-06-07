import buildApp from './app';

import logger from '@/utils/logger';

const app = buildApp({
	logger: {
		level: 'debug',
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
				ignore: 'hostname',
			},
		},
	},
	maxParamLength: 5000,
	trustProxy: true,
	exposeHeadRoutes: true,
});

async function server() {
	const port = 5565;

	try {
		(await app).listen({ port, host: '0.0.0.0' });
		(await app).swagger();
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}
}

server();
