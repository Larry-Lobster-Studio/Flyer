'use client';

import clsx from 'clsx';

export default function Error() {
	return (
		<div className={clsx('flex items-center justify-center w-full h-full')}>
			<p className={clsx('text-2xl font-semibold text-red-500')}> Error... </p>
		</div>
	);
}
