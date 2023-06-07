import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { getInvoice } from '@/lib/api/invoice/invoice';

import { PageHeader } from '../../components';
import { OptionButtons, Invoice } from './components';

export default async function Page({
	params,
}: {
	params: { invoiceId: string };
}) {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		[`/v1/invoices/${params.invoiceId}`],
		async () => await getInvoice(params.invoiceId)
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='invoice'
				children={<OptionButtons invoiceId={params.invoiceId} />}
			/>

			<Hydrate state={dehydratedState}>
				<Invoice invoiceId={params.invoiceId} />
			</Hydrate>
		</main>
	);
}
