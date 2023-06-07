import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { getExpense } from '@/lib/api/expense/expense';

import { PageHeader } from '../../components';
import { Expense } from './components';

export default async function Page({
	params,
}: {
	params: { expenseId: string };
}) {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		[`/v1/expenses/${params.expenseId}`],
		async () => await getExpense(params.expenseId)
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='expense'
				// children={<OptionButtons invoiceId={params.invoiceId} />}
			/>

			<Hydrate state={dehydratedState}>
				<Expense expenseId={params.expenseId} />
			</Hydrate>
		</main>
	);
}
