import type { ReactNode } from 'react';

import { Comfortaa } from 'next/font/google';
import clsx from 'clsx';

const comfortaa = Comfortaa({
	display: 'swap',
	subsets: ['latin'],
});

interface Props {
	title: string;
	subTitle?: string;
	children?: ReactNode;
}

export default function PageHeader({ title, subTitle, children }: Props) {
	return (
		<div className={clsx('flex items-stretch justify-between gap-x-3 mb-8')}>
			<div>
				<h1
					className={clsx(
						comfortaa.className,
						'mb text-2xl font-extrabold capitalize'
					)}
				>
					{title}
				</h1>
				<span className={clsx('text-flyer-gray')}>{subTitle}</span>
			</div>

			<div>{children}</div>
		</div>
	);
}
