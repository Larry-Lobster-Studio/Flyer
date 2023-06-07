import type { Dispatch, SetStateAction } from 'react';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import type { ListContacts200ItemsItem } from '@/lib/api/interfaces';

import { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Table } from '@/components/table';
import ContactOptions from './ContactOptions';

interface Props {
	tableData: ListContacts200ItemsItem[];
	totalItems: number;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export default function ContactsTable({
	tableData,
	totalItems,
	pageCount,
	pagination,
	setPagination,
}: Props) {
	const [columns, data] = useMemo(() => {
		const columns: ColumnDef<ListContacts200ItemsItem>[] = [
			{
				accessorKey: 'id',
				cell: (info) => {
					return (
						<Link href={`/contacts/${info.getValue()}`} className={clsx('')}>
							<p> {info.row.original.name} </p>
							<span className={clsx('text-sm text-flyer-gray')}>
								{info.row.original.email}
							</span>
						</Link>
					);
				},
				header: () => <span>name</span>,
			},
			{
				accessorKey: 'vat',
				cell: (info) => {
					return <p> {String(info.getValue())} </p>;
				},
				header: () => <span>vat</span>,
			},
			{
				id: 'actions',
				cell: (info) => {
					return (
						<div className={clsx('flex items-center justify-end')}>
							<ContactOptions contactId={info.row.original.id} />
						</div>
					);
				},
				header: () => <span />,
			},
		];

		return [columns, tableData, totalItems, pagination, pageCount];
	}, [tableData, totalItems, pagination, pageCount]);

	return (
		<Table
			data={data}
			columns={columns}
			totalItems={totalItems}
			pagination={pagination}
			setPagination={setPagination}
			pageCount={pageCount}
		/>
	);
}
