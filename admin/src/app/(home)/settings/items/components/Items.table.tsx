import type { Dispatch, SetStateAction } from 'react';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import type { ListItems200ItemsItem } from '@/lib/api/interfaces';

import { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Table } from '@/components/table';
import ItemOptions from './ItemOptions';

interface Props {
	tableData: ListItems200ItemsItem[];
	totalItems: number;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export default function ItemsTable({
	tableData,
	totalItems,
	pageCount,
	pagination,
	setPagination,
}: Props) {
	const [columns, data] = useMemo(() => {
		const columns: ColumnDef<ListItems200ItemsItem>[] = [
			{
				accessorKey: 'name',
				cell: (info) => {
					return (
						<Link
							href={`/settings/items/${info.row.original.id}`}
							className={clsx('flex flex-col')}
						>
							<span>{String(info.getValue())}</span>
							<span className={clsx('text-xs text-flyer-gray')}>
								{info.row.original.description}
							</span>
						</Link>
					);
				},
				header: () => <span>name</span>,
			},
			{
				accessorKey: 'price',
				cell: (info) => {
					return (
						<span className={clsx('')}>
							{new Intl.NumberFormat('be-NL', {
								style: 'currency',
								currency: 'EUR',
							}).format(Number(info.getValue()))}
						</span>
					);
				},
				header: () => <span>price</span>,
			},
			{
				accessorKey: 'unit',
				cell: (info) => {
					return <span className={clsx('')}>{String(info.getValue())}</span>;
				},
				header: () => <span>unit</span>,
			},
			{
				accessorKey: 'tax',
				cell: (info) => {
					return <span className={clsx('')}>{String(info.getValue())}%</span>;
				},
				header: () => <span>tax</span>,
			},
			{
				id: 'actions',
				cell: (info) => {
					return (
						<div className={clsx('flex items-center justify-end')}>
							<ItemOptions itemId={info.row.original.id} />
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
