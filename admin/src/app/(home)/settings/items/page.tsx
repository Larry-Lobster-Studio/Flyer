import clsx from 'clsx';
import { Hydrate, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { listItems } from '@/lib/api/item/item';

import { PageHeader } from '../../components';
import { Navigation } from '../components';
import { HeaderRight, ListItems } from './components';

export default async function Page() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['/v1/items'], async () => await listItems());
	const dehydratedState = dehydrate(queryClient);
	return (
		<>
			<main className={clsx('p-4', 'sm')}>
				<PageHeader
					title='items'
					subTitle='Manage invoice items and their accessories'
					children={<HeaderRight />}
				/>

				<Navigation />

				<Hydrate state={dehydratedState}>
					<ListItems />
				</Hydrate>
			</main>
		</>
	);
}
