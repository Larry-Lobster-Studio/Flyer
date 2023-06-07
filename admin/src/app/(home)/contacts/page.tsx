import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query';
import { listContacts } from '@/lib/api/contact/contact';

import { PageHeader } from '../components';
import NewContactButton from './components/newContact.button';
import ListContacts from './components/ListContacts';

export default async function Page() {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		['/v1/contacts'],
		async () => await listContacts({})
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader title='contacts' children={<NewContactButton />} />

			<Hydrate state={dehydratedState}>
				<ListContacts />
			</Hydrate>
		</main>
	);
}
