import clsx from 'clsx';

import { PageHeader } from '../components';

export default function Page() {
	return (
		<main className={clsx('p-4', 'sm')}>
			<PageHeader title='reports' />
		</main>
	);
}
