export const schema = {
	type: 'object',
	required: [
		'SERVER_URL',
		'FRONTEND_URL',
		'GOTENBERG_URL',
		'S3_HOSTNAME',
		'S3_ACCESS_KEY',
		'S3_SECRET_KEY',
		'DATABASE_URL',
		'EMAIL_HOST',
		'EMAIL_USER',
		'EMAIL_PASSWORD',
	],
	properties: {
		NODE_ENV: {
			type: 'string',
			default: 'development',
		},
		SERVER_URL: {
			type: 'string',
		},
		FRONTEND_URL: {
			type: 'string',
		},
		GOTENBERG_URL: {
			type: 'string',
		},
		S3_HOSTNAME: {
			type: 'string',
		},
		S3_ACCESS_KEY: {
			type: 'string',
		},
		S3_SECRET_KEY: {
			type: 'string',
		},
		S3_REGION: {
			type: 'string',
			default: 'eu-west-1',
		},
		S3_BUCKET: {
			type: 'string',
			default: 'flyer',
		},
		DATABASE_URL: {
			type: 'string',
		},
		EMAIL_HOST: {
			type: 'string',
		},
		EMAIL_PORT: {
			type: 'number',
			default: 2525,
		},
		EMAIL_USER: {
			type: 'string',
		},
		EMAIL_PASSWORD: {
			type: 'string',
		},
	},
};
