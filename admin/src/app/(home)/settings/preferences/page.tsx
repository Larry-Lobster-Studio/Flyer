import clsx from 'clsx';
import { dehydrate, Hydrate } from '@tanstack/react-query';

import { getCompanySettings } from '@/lib/api/company-settings/company-settings';
import { getQueryClient } from '@/lib/query';
import { PageHeader } from '../../components';
import { Navigation } from '../components';
import { GeneralSettings, InvoiceSettings } from './components';

export default async function Page() {
	const queryClient = getQueryClient();
	const dehydratedState = dehydrate(queryClient);
	await queryClient.prefetchQuery(
		['/v1/company/settings'],
		async () => await getCompanySettings()
	);

	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='preferences'
				subTitle='Default preferences for the system.'
			/>

			<Navigation />

			<Hydrate state={dehydratedState}>
				<GeneralSettings />

				<InvoiceSettings />
			</Hydrate>
		</main>
	);
}
