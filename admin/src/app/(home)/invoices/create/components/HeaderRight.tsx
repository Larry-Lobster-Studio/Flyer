import type { Dispatch, SetStateAction } from 'react';

import clsx from 'clsx';
import { Eye } from '@phosphor-icons/react';

interface Props {
	setSidebarStatus: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderRight({ setSidebarStatus }: Props) {
	return (
		<div className={clsx('flex items-center gap-x-3')}>
			<button
				type='button'
				onClick={() => setSidebarStatus(true)}
				className={clsx(
					'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-white text-flyer-gray',
					'hover:bg-flyer-gray hover:text-flyer-white'
				)}
			>
				<Eye size={14} className={clsx('')} />
				<span>preview</span>
			</button>

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
