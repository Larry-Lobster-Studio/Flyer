import Link from 'next/link';
import { Comfortaa } from 'next/font/google';
import clsx from 'clsx';

import SidebarMenu from './sidebarMenu';
import CompanySelector from './companySelector';

const comfortaa = Comfortaa({
	display: 'swap',
	subsets: ['latin'],
});

export default function Sidebar() {
	return (
		<aside
			id='sidebar'
			aria-label='Sidebar'
			className={clsx(
				'fixed top-0 left-0 z-40 w-60 h-screen  transition-transform -translate-x-full',
				'sm:translate-x-0'
			)}
		>
			<div
				className={clsx(
					'flex flex-col justify-stretch gap-y-5 h-full px-3 py-4 bg-flyer-gray'
				)}
			>
				<Link
					href={'/'}
					className={clsx(
						comfortaa.className,
						'pl-3 text-3xl font-bold text-flyer-primary whitespace-nowrap'
					)}
				>
					Flyer
				</Link>

				<SidebarMenu />

				<div className={clsx('pl-3 text-xs text-flyer-white')}>
					<Link href={'#'}>Help & getting started</Link>
				</div>

				{/* <div className={clsx('pt-2 border-t border-flyer-white')}>
					<CompanySelector />
				</div> */}
			</div>
		</aside>
	);
}
