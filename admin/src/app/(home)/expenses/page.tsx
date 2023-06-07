import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { listExpenses } from '@/lib/api/expense/expense';

import { PageHeader } from '../components';
import { ListExpenses, NewExpenseButton } from './components';

export default async function Page() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		['/v1/expenses'],
		async () => await listExpenses({})
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader title='expenses' children={<NewExpenseButton />} />

			<Hydrate state={dehydratedState}>
				<ListExpenses />
			</Hydrate>
		</main>
	);
}
