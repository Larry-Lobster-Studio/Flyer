import clsx from 'clsx';

import Searchbar from './searchbar';

export default function Navigation() {
	return (
		<div
			className={clsx(
				'fixed top-0 z-30 flex items-center justify-between gap-x-2 w-full py-4 px-6 shadow-md bg-flyer-white',
				'sm:pl-60 sm:justify-end'
			)}
		>
			<button
				data-drawer-target='sidebar'
				data-drawer-toggle='sidebar'
				aria-controls='sidebar'
				type='button'
				className={clsx(
					'inline-flex items-center p-2 text-sm roinded-lg',
					'sm:hidden',
					'hover:bg-gray-100',
					'focus:outline-none focus:ring-2 focus:ring-gray-200'
				)}
			>
				<span className='sr-only'>Open sidebar</span>
				<svg
					className='w-6 h-6'
					aria-hidden='true'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						clip-rule='evenodd'
						fill-rule='evenodd'
						d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
					/>
				</svg>
			</button>

			<div
				className={clsx(
					'flex items-center justify-between gap-x-4 w-full',
					'sm:ml-6'
				)}
			>
				<Searchbar />

				<div
					className={clsx(
						'relative inline-flex items-center justify-center w-9 h-9 overflow-hidden rounded-full bg-flyer-primary'
					)}
				>
					<span className={clsx('text-sm font-medium')}>BL</span>
				</div>
			</div>
		</div>
	);
}
