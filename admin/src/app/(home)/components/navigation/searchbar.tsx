'use client';

import clsx from 'clsx';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function Searchbar() {
	return (
		<div className={clsx('w-full max-w-xl')}>
			<label htmlFor='search' className={clsx('sr-only')}>
				Search
			</label>
			<div className={clsx('relative w-full')}>
				<MagnifyingGlass
					size={26}
					className={clsx(
						'absolute inset-y-0 left-0 h-full pl-3 text-flyer-gray/60 pointer-events-none'
					)}
				/>
				<input
					id='search'
					type='search'
					placeholder='Search invoices, clients...'
					required
					className={clsx(
						'block w-full p-2 pl-8 text-sm rounded-lg border border-lg border-flyer-gray/30 bg-flyer-white',
						'focus:outline-none focus:border-flyer-primary focus:ring-flyer-primary'
					)}
				/>
			</div>
		</div>
	);
}
