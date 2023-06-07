import clsx from 'clsx';
import { Comfortaa } from 'next/font/google';

const comfortaa = Comfortaa({
	display: 'swap',
	subsets: ['latin'],
});

interface Props {
	children: React.ReactNode;
}

export default function layout({ children }: Props) {
	return (
		<main
			className={clsx(
				'min-h-screen',
				'sm:flex sm:items-stretch sm:justify-stretch'
			)}
		>
			<div
				className={clsx(
					'hidden flex-grow flex-col items-stretch justify-between gap-y-7 max-w-md m-3 px-10 py-14 rounded-xl bg-flyer-gray',
					'sm:flex'
				)}
			>
				<span
					className={clsx(
						comfortaa.className,
						'mb-28 text-3xl font-bold text-flyer-primary whitespace-nowrap'
					)}
				>
					Flyer
				</span>

				<div className={clsx('flex-grow flex flex-col gap-y-10 text-white')}>
					<span className={clsx('text-5xl')}>Start your journey with us.</span>

					<span className={clsx('font-light')}>
						Flyer helps you track expenses, record payments & generate beautiful
						invoices & estimates.
					</span>
				</div>

				<div></div>
			</div>

			<div className={clsx('mt-3 px-6', 'sm:hidden')}>
				<span
					className={clsx(
						comfortaa.className,
						'mb-28 text-3xl font-bold text-flyer-gray whitespace-nowrap'
					)}
				>
					Flyer
				</span>
			</div>
			<div className={clsx('flex-grow pt-24 pb-16 pl-10 pr-14')}>
				{children}
			</div>
		</main>
	);
}
