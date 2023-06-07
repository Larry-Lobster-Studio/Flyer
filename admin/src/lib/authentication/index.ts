import { FrontendApi, Configuration } from '@ory/client';

const ory = new FrontendApi(
	new Configuration({
		basePath: process.env.NEXT_PUBLIC_ORY_URL,
		baseOptions: {
			withCredentials: true,
		},
	})
);

export default ory;
export * from './isAuthenticated';
export * from './handleFlowError';
