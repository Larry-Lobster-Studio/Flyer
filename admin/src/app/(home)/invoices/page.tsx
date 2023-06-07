import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { listInvoices } from '@/lib/api/invoice/invoice';

import { PageHeader } from '../components';
import { NewInvoiceButton, ListInvoices } from './components';

export default async function Page() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(
		['/v1/invoices'],
		async () => await listInvoices({})
	);
	const dehydratedState = dehydrate(queryClient);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader title='invoices' children={<NewInvoiceButton />} />

			<Hydrate state={dehydratedState}>
				<ListInvoices />
			</Hydrate>
		</main>
	);
}
