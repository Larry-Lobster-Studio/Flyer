import clsx from 'clsx';

import { PageHeader } from '../../components';
import { Navigation } from '../components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='notes'
				subTitle='Save time by creating notes and reusing them on your invoices, estimates & payments.'
			/>

			<Navigation />
		</main>
	);
}
