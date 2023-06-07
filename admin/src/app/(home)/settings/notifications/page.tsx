import clsx from 'clsx';

import { PageHeader } from '../../components';
import { Navigation } from '../components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader
				title='notifications'
				subTitle='Which email notifications would you like to receive when something changes?'
			/>

			<Navigation />
		</main>
	);
}
