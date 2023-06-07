import type { FastifyCorsOptions } from '@fastify/cors';
import type { SwaggerOptions } from '@fastify/swagger';

import dotenv from 'dotenv';

import { bool, int } from '@/utils';

const envFound = dotenv.config();
if (process.env.NODE_ENV === 'development' && envFound.error) {
	// This error should crash whole process
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
	environment: process.env.NODE_ENV,
	frontend_url: String(process.env.FRONTEND_URL),
	server_url: String(process.env.SERVER_URL),
	gotenberg_url: String(process.env.GOTENBERG_URL),
	company: process.env.COMPANY ?? 'ACME inc.',
	rateLimit: {
		public: {
			points: int(process.env.RATE_LIMIT_PUBLIC_POINTS, 250),
			duration: int(process.env.RATE_LIMIT_PUBLIC_DURATION, 3600),
		},
		authenticated: {
			points: int(process.env.RATE_LIMIT_AUTHENTICATED_POINTS, 5000),
			duration: int(process.env.RATE_LIMIT_AUTHENTICATED_DURATION, 3600),
		},
		apiKey: {
			points: int(process.env.RATE_LIMIT_API_KEY_POINTS, 10000),
			duration: int(process.env.RATE_LIMIT_API_KEY_DURATION, 3600),
		},
	},
	authentication: {
		adminUrl: String(process.env.KRATOS_ADMIN_URL),
		url: String(process.env.KRATOS_URL),
	},
	notifications: {
		novu: {
			apiKey: String(process.env.NOVU_API_KEY),
		},
	},
	meili: {
		host: String(process.env.MEILI_HOST),
	},
	email: {
		name: process.env.EMAIL_NAME ?? 'Flyer',
		from: process.env.EMAIL_FROM ?? 'no-reply@flyer.io',
		retries: int(process.env.EMAIL_FAIL_RETRIES, 3),
		transport: {
			host: String(process.env.EMAIL_HOST),
			port: int(process.env.EMAIL_PORT, 587),
			auth: {
				user:
					process.env.EMAIL_USER ??
					process.env.EMAIL_FROM ??
					'no-reply@flyer.io',
				pass: process.env.EMAIL_PASSWORD,
			},
		},
	},
	s3: {
		accessKeyId: String(process.env.S3_ACCESS_KEY),
		secretAccessKey: String(process.env.S3_SECRET_KEY),
		region: process.env.S3_REGION ?? 'eu-west-1',
		hostname: String(process.env.S3_HOSTNAME),
		bucket: process.env.S3_BUCKET ?? 'flyer',
	},
	postgres: {
		user: String(process.env.POSTGRES_USER),
		password: String(process.env.POSTGRES_PASSWORD),
		host: String(process.env.DB_HOST),
		port: Number(process.env.DB_PORT),
		db: String(process.env.POSTGRES_DB),
	},
	redis: {
		user: String(process.env.REDIS_USER),
		password: String(process.env.REDIS_PASSWORD),
		host: String(process.env.REDIS_HOST),
		port: Number(process.env.REDIS_PORT),
	},
	cors: {
		development: {
			origin: [
				'http://localhost:4011',
				'http://127.0.0.1',
				'http://127.0.0.1:4011',
				'http://127.0.0.1:3000',
			],
		} as FastifyCorsOptions,
		production: {
			origin: ['http://127.0.0.1', 'http://127.0.0.1:3000'],
			methods: ['POST', 'PUT', 'GET', 'DELETE'],
			credentials: true,
		} as FastifyCorsOptions,
	},
	swagger: {
		openapi: {
			info: {
				title: 'Flyer Openapi',
				description: 'Flyer Openapi version',
				version: '1.0.0',
			},
			host: 'localhost:5565',
			servers: [
				{
					url: 'http://localhost:5565',
					description: 'Localhost test server',
				},
			],
			components: {
				securitySchemes: {
					cookieAuth: {
						type: 'apiKey',
						in: 'cookie',
						name: 'flyer-session',
					},
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
					},
				},
			},
		},
		hideUntagged: true,
		exposeRoute: true,
	} as SwaggerOptions,
};

export { config };
