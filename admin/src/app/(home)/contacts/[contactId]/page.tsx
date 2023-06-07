import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { getContact } from '@/lib/api/contact/contact';

import { PageHeader } from '../../components';
import { OptionButtons, Contact } from './components';

export default async function Page({
	params,
}: {
	params: { contactId: string };
}) {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		[`/v1/contacts/${params.contactId}`],
		async () => await getContact(params.contactId)
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='client'
				children={<OptionButtons contactId={params.contactId} />}
			/>

			<Hydrate state={dehydratedState}>
				<Contact contactId={params.contactId} />
			</Hydrate>
		</main>
	);
}
