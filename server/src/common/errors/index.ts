const errors = {
	USER_NOT_FOUND: {
		status: 401,
		error: 'USER_NOT_FOUND',
		message: 'User not found',
	},
	SESSION_NOT_FOUND: {
		status: 401,
		error: 'SESSION_NOT_FOUND',
		message: 'Session not found',
	},
	COMPANY_NOT_PROVIDED: {
		status: 401,
		error: 'COMPANY_NOT_PROVIDED',
		message: 'You must provide a company',
	},
	MFA_REQUIRED: {
		status: 400,
		error: 'MFA_REQUIRED',
		message: `/kratos/self-service/login/browser?${new URLSearchParams({
			aal: 'aal2',
		}).toString()}`,
	},
	NOT_AUTHENTICATED: {
		status: 400,
		error: 'NOT_AUTHENTICATED',
		message: `/kratos/self-service/login/browser`,
	},
	EMAIL_NOT_FOUND: {
		status: 400,
		error: 'EMAIL_NOT_FOUND',
		message: 'Email not found',
	},
	API_KEY_NOT_FOUND: {
		status: 401,
		error: 'API_KEY_NOT_FOUND',
		message: 'API key not found',
	},
	SOURCE_NOT_FOUND: {
		status: 400,
		error: 'SOURCE_NOT_FOUND',
		message: 'Source not found',
	},
	WEBHOOK_NOT_FOUND: {
		status: 400,
		error: 'WEBHOOK_NOT_FOUND',
		message: 'Webhook not found',
	},
	UNAUTHORIZED_RESOURCE: {
		status: 400,
		error: 'UNAUTHORIZED_RESOURCE',
		message: 'Insufficient permission',
	},
	CANNOT_DELETE_SOLE_MEMBER: {
		status: 400,
		error: 'CANNOT_DELETE_SOLE_MEMBER',
		message: 'Cannot remove the only member',
	},
	CANNOT_DELETE_SOLE_OWNER: {
		status: 400,
		error: 'CANNOT_DELETE_SOLE_OWNER',
		message: 'Cannot remove the only owner',
	},
	ORDER_BY_ASC_DESC: {
		status: 400,
		error: 'ORDER_BY_ASC_DESC',
		message: 'Invalid sorting order',
	},
	ORDER_BY_FORMAT: {
		status: 400,
		error: 'ORDER_BY_FORMAT',
		message: 'Invalid ordering format',
	},
	WHERE_PIPE_FORMAT: {
		status: 400,
		error: 'WHERE_PIPE_FORMAT',
		message: 'Invalid query format',
	},
	CANNOT_UPDATE_ROLE_SOLE_OWNER: {
		status: 400,
		error: 'CANNOT_UPDATE_ROLE_SOLE_OWNER',
		message: 'Cannot change the role of the only owner',
	},
	FILE_TOO_LARGE: {
		status: 413,
		error: 'FILE_TOO_LARGE',
		message: 'Uploaded file is too large',
	},
	RATE_LIMIT_EXCEEDED: {
		status: 429,
		error: 'RATE_LIMIT_EXCEEDED',
		message: 'Rate limit exceeded',
	},
	SERVER_ERROR: {
		status: 500,
		error: 'SERVER_ERROR',
		message: 'Something went wrong',
	},
	SUBSCRIPTION_ERROR: {
		status: 400,
		error: 'SUBSCRIPTION_ERROR',
		message:
			'You reached the limit of your subscription. Please updgrade if you want to continue.',
	},
};

export default errors;
