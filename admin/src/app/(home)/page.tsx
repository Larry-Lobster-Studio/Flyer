import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
// import { getCompany } from '@/lib/api/company/company';

import { PageHeader } from './components';

export default async function Home() {
	const queryClient = getQueryClient();
	// await queryClient.prefetchQuery(
	// 	['/v1/company'],
	// 	async () => await getCompany()
	// );
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader title='dashboard' />

			<Hydrate state={dehydratedState}>{/* <Test /> */}</Hydrate>
		</main>
	);
}
