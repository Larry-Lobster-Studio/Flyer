import Link from 'next/link';
import clsx from 'clsx';

import { Login } from './components';

export default function Page() {
	return (
		<div className='flex flex-col gap-y-10 h-full'>
			<div className={clsx('')}>
				<p className={clsx('mb-2 text-3xl font-medium')}> Login </p>
				<Link href={'/auth/recovery'} className={clsx('text-sm font-light')}>
					Forgot your password?{' '}
					<span className={clsx('text-flyer-secondary')}> Recover </span>
				</Link>
			</div>

			<Login />
		</div>
	);
}
