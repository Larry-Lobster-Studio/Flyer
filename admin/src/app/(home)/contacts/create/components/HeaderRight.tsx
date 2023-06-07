import clsx from 'clsx';

export default function HeaderRight() {
	return (
		<div className={clsx('flex items-center gap-x-3')}>
			<button
				type='submit'
				className={clsx(
					'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
					'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
				)}
			>
				create
			</button>
		</div>
	);
}
