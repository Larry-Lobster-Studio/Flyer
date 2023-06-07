'use client';

import clsx from 'clsx';
import { CaretUpDown } from '@phosphor-icons/react';

export default function CompanySelector() {
	return (
		<div
			className={clsx(
				'flex items-center gap-x-3 h-fit w-full p-2  text-flyer-white rounded-lg',
				'hover:bg-flyer-primary hover:text-flyer-gray'
			)}
		>
			<div
				className={clsx(
					'relative inline-flex items-center justify-center w-8 h-8 overflow-hidden text-flyer-gray rounded-full bg-flyer-primary'
				)}
			>
				<span className={clsx('font-medium')}>F</span>
			</div>

			<div className={clsx('grow')}>
				<span className={clsx('text-lg font-semibold')}>Facilify</span>
			</div>

			<CaretUpDown size={22} className={clsx('')} />
		</div>
	);
}
