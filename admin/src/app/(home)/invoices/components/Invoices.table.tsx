import type { Dispatch, SetStateAction } from 'react';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import type { ListInvoices200ItemsItem } from '@/lib/api/interfaces';

import { useMemo } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { format } from 'date-fns';

import { Table } from '@/components/table';
import { DotsThree } from '@phosphor-icons/react';

interface Props {
	tableData: ListInvoices200ItemsItem[];
	totalItems: number;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function InvoicesTable({
	tableData,
	totalItems,
	pageCount,
	pagination,
	setPagination,
}: Props) {
	const [columns, data] = useMemo(() => {
		const columns: ColumnDef<ListInvoices200ItemsItem>[] = [
			{
				accessorKey: 'invoice_number',
				cell: (info) => {
					return (
						<Link
							href={`/invoices/${info.row.original.id}`}
							className={clsx('')}
						>
							{String(info.getValue())}
						</Link>
					);
				},
				header: () => <span>#</span>,
			},
			{
				accessorKey: 'contact.id',
				cell: (info) => {
					return (
						<div className={clsx('')}>
							<p className={clsx('')}>{info.row.original.contact.name}</p>
							<p className={clsx('text-sm text-flyer-gray')}>
								{info.row.original.contact.email}
							</p>
						</div>
					);
				},
				header: () => <span> contact </span>,
			},
			{
				accessorKey: 'total',
				cell: (info) => {
					return (
						<span>
							{new Intl.NumberFormat('be-NL', {
								style: 'currency',
								currency: info.row.original.currency,
								currencySign: 'accounting',
							}).format(Number(info.getValue()))}
						</span>
					);
				},
				header: () => <span> amount </span>,
			},
			{
				accessorKey: 'due_date',
				cell: (info) => {
					return (
						<span>
							{format(new Date(String(info.getValue())), 'dd MMM yyyy')}
						</span>
					);
				},
				header: () => <span> due date </span>,
			},
			{
				accessorKey: 'payment_status',
				cell: (info) => {
					return (
						<div className={clsx('flex items-center gap-x-2')}>
							<style>
								{`#square-circle-${String(info.getValue())}:after {
										background-color: #0ea5e9;
									}`}
							</style>
							<div
								id={`square-circle-${String(info.getValue())}`}
								className={clsx(
									'bg-sky-100',
									'table w-4 h-4 border-separate border-spacing-1 rounded',
									`after:content-[""] after:table-cell after:rounded-full`
								)}
							/>

							<p className={clsx('text-sky-500 lowercase')}>
								{info.row.original.status === 'DRAFT'
									? 'draft'
									: String(info.getValue())}
							</p>
						</div>
					);
				},
				header: () => <span> status </span>,
			},
			{
				id: 'actions',
				cell: (info) => {
					return (
						<div className={clsx('flex justify-end')}>
							<div
								className={clsx(
									'flex items-center justify-center w-min p-2 rounded-md border border-flyer-gray'
								)}
							>
								<DotsThree size={14} />
							</div>
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
