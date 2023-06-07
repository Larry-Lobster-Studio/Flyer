import clsx from 'clsx';

import { PageHeader } from '../../components';
import { Navigation } from '../components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='company'
				subTitle='Information about your company that will be displayed on invoices, estimates and other documents'
			/>

			<Navigation />
		</main>
	);
}
