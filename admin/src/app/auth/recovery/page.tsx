import Link from 'next/link';
import clsx from 'clsx';

import { Recovery } from './components';

export default function Page() {
	return (
		<div className='flex flex-col gap-y-10 h-full'>
			<div className={clsx('')}>
				<p className={clsx('mb-2 text-3xl font-medium')}> Recover </p>
				<Link href={'/auth/login'} className={clsx('text-sm font-light')}>
					Have an account?{' '}
					<span className={clsx('text-flyer-secondary')}> Login </span>
				</Link>
			</div>
			<Recovery />
		</div>
	);
}
