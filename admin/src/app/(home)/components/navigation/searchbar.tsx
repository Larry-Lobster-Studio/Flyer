'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Calendar, Settings, Smile, User } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/command';
import { Button } from '@/components/button';

export default function Searchbar() {
	const { push } = useRouter();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<Button
				variant={'outline'}
				className={cn('relative text-flyer-gray', 'sm:pr-20')}
				onClick={() => setOpen((open) => !open)}
			>
				<span className={cn('hidden', 'lg:inline-flex')}>
					Search invoices, clients...
				</span>

				<kbd
					className={cn(
						'absolute hidden items-center gap-1 rounded border bg-muted right-1.5 top-2 h-5 px-1.5 pointer-events-none select-none',
						'sm:flex'
					)}
				>
					<span className={cn('text-xs')}>⌘</span> K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder='Search invoices, clients...' />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading='Suggestions'>
						<CommandItem>
							<Calendar className='mr-2 h-4 w-4' />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile className='mr-2 h-4 w-4' />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator className='mr-2 h-4 w-4' />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Settings'>
						<CommandItem>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
							<CommandShortcut
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
										e.preventDefault();
										push('/settings');
									}
								}}
							>
								⌘P
							</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Settings</span>
							<CommandShortcut
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
										e.preventDefault();
										push('/settings');
									}
								}}
							>
								⌘S
							</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
