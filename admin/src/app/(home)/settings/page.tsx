import clsx from 'clsx';

import { PageHeader } from '../components';
import { Navigation, Settings } from './components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='account'
				subTitle='Manage the settings for your Flyer app'
			/>

			<Navigation />

			<Settings />
		</main>
	);
}
