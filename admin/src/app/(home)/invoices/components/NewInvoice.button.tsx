'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { PlusCircle } from '@phosphor-icons/react';

export function NewInvoiceButton() {
	return (
		<Link
			href={'/invoices/create'}
			className={clsx(
				'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg bg-flyer-gray text-white',
				'hover:bg-flyer-primary hover:text-flyer-gray'
			)}
		>
			<PlusCircle size={18} />

			<span> create new </span>
		</Link>
	);
}
