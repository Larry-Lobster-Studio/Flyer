import clsx from 'clsx';

import { PageHeader } from '../../components';
import { Navigation } from '../components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='roles'
				subTitle='Manage the roles & permissions of this company'
			/>

			<Navigation />
		</main>
	);
}
