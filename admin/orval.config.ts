export default {
	'flyer-file': {
		input: {
			target: './swagger.json',
		},
		output: {
			mode: 'tags-split',
			target: './src/lib/api/flyer.ts',
			schemas: './src/lib/api/interfaces',
			client: 'react-query',
			prettier: true,
			override: {
				query: {
					useQuery: true,
				},
				mutator: {
					path: './src/lib/orvalInstance.ts',
					name: 'customInstance',
				},
				operations: {},
			},
		},
		hooks: {
			afterAllFilesWrite: 'prettier --write',
		},
	},
};
