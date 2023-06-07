'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
	User,
	Warehouse,
	Notification,
	Gear,
	Users,
	Note,
	ClockCounterClockwise,
	PuzzlePiece,
} from '@phosphor-icons/react';

const menu = [
	{
		label: 'account',
		href: '',
		icon: User,
	},
	{
		label: 'company',
		href: '/company',
		icon: Warehouse,
	},
	{
		label: 'preferences',
		href: '/preferences',
		icon: Gear,
	},
	{
		label: 'items',
		href: '/items',
		icon: PuzzlePiece,
	},
	{
		label: 'roles',
		href: '/roles',
		icon: Users,
	},
	{
		label: 'notes',
		href: '/notes',
		icon: Note,
	},
	{
		label: 'backup',
		href: '/backup',
		icon: ClockCounterClockwise,
	},
	{
		label: 'notifications',
		href: '/notifications',
		icon: Notification,
	},
];

export function Navigation() {
	const pathName = usePathname();

	return (
		<div
			className={clsx(
				'flex w-full mb-6 px-3 overflow-x-auto overflow-y-hidden border-b scrollbar-hide'
			)}
		>
			{menu.map((item) => {
				return (
					<Link
						key={item.label}
						href={`/settings${item.href}`}
						className={clsx(
							'flex items-center gap-x-2 -mb-[0.1rem] px-3 border-b',
							pathName === `/settings${item.href}` &&
								'text-flyer-secondary border-b-flyer-secondary'
						)}
					>
						<item.icon size={16} />
						<span>{item.label}</span>
					</Link>
				);
			})}
		</div>
	);
}
