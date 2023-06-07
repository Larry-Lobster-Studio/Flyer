import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';

interface Props {}

export default function HeaderRight({}: Props) {
	return (
		<div className={clsx('flex items-center gap-x-3')}>
			<button
				type='submit'
				className={clsx(
					'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
					'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
				)}
			>
				approve
			</button>
		</div>
	);
}
