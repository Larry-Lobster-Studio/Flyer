import clsx from 'clsx';

export default function BottomButtons() {
	return (
		<div className={clsx('flex items-center justify-between gap-x-6')}>
			<button
				type='button'
				className={clsx(
					'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-white text-flyer-gray',
					'hover:bg-rose-400 hover:border-rose-400 hover:text-flyer-white'
				)}
			>
				<span>cancel</span>
			</button>

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
		</div>
	);
}
