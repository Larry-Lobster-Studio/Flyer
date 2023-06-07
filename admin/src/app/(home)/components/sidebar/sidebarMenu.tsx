'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
	HouseSimple,
	User,
	Files,
	ChartLineUp,
	GearSix,
	Receipt,
} from '@phosphor-icons/react';

const menu = [
	{
		label: 'dashboard',
		href: '/',
		icon: HouseSimple,
	},
	{
		label: 'contacts',
		href: '/contacts',
		icon: User,
	},
	{
		label: 'invoices',
		href: '/invoices',
		icon: Files,
	},
	{
		label: 'expenses',
		href: '/expenses',
		icon: Receipt,
	},
	{
		label: 'reports',
		href: '/reports',
		icon: ChartLineUp,
	},
	{
		label: 'settings',
		href: '/settings',
		icon: GearSix,
	},
];

function currentLink(pathname: string, href: string) {
	if (pathname === href) {
		return true;
	}
	if (href === '/' && pathname !== '/') {
		return false;
	}

	return pathname.includes(href);
}

export default function SidebarMenu() {
	const pathname = usePathname();

	return (
		<ul className={clsx('flex-grow mt-5 space-y-2 overflow-y-auto')}>
			{menu.map((item) => {
				return (
					<li key={item.label}>
						<Link
							href={item.href}
							className={clsx(
								'flex items-center p-2 text-sm  rounded-lg',
								'hover:bg-flyer-primary hover:text-flyer-gray',
								currentLink(pathname, item.href)
									? 'text-flyer-gray bg-flyer-primary'
									: 'text-flyer-white'
							)}
						>
							<item.icon
								size={20}
								className={clsx('flex-shrink-0 transition duration-75')}
							/>

							<span
								className={clsx('flex-1 ml-3 capitalize whitespace-nowrap')}
							>
								{item.label}
							</span>
							{/* <span
								className={clsx(
									'inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full'
								)}
							>
								Pro
							</span> */}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
