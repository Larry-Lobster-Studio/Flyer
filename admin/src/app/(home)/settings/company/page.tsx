import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getCompany } from '@/lib/api/company/company';
import { getQueryClient } from '@/lib/query';

import { PageHeader } from '../../components';
import { Navigation } from '../components';
import { Company } from './components';

export default async function Page() {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		['/v1/company'],
		async () => await getCompany()
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='company'
				subTitle='Information about your company that will be displayed on invoices, estimates and other documents'
			/>

			<Navigation />

			<Hydrate state={dehydratedState}>
				<Company />
			</Hydrate>
		</main>
	);
}
