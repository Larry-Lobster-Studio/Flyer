import { FrontendApi, Configuration, IdentityApi } from '@ory/client';

import { config } from '@/config/main.config';

console.log('config: ', config.authentication);

//* ORY client for the saas application itself
export const ory = new FrontendApi(
	new Configuration({
		basePath: config.authentication.url,
	})
);

export const oryAdmin = new IdentityApi(
	new Configuration({
		basePath: config.authentication.adminUrl,
	})
);
