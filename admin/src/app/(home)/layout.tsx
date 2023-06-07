import clsx from 'clsx';

import { Navigation, Sidebar } from './components';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className={clsx('')}>
			<Navigation />

			<Sidebar />

			<div className={clsx('mt-16 p-4', 'sm:ml-60')}>{children}</div>
		</section>
	);
}
