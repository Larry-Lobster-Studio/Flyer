'use client';

import type { PaginationState } from '@tanstack/react-table';

import { useMemo, useState } from 'react';

import { useListInvoices } from '@/lib/api/invoice/invoice';
import { InvoicesTable } from './Invoices.table';

export function ListInvoices() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isSuccess, refetch, isRefetching, isLoading } = useListInvoices(
		{
			page: pageIndex,
			per_page: pageSize,
		},
		{
			query: { keepPreviousData: true },
		}
	);

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	return (
		<div>
			{isSuccess && data.items.length ? (
				<InvoicesTable
					tableData={data.items}
					totalItems={data.total}
					pagination={pagination}
					setPagination={setPagination}
					pageCount={Math.ceil(data.total / pageSize)}
				/>
			) : (
				<div>
					<p className='mb-4 text-slate-400 text-center text-lg'>
						{isLoading || isRefetching
							? 'Loading data'
							: 'There are no invoices yet'}
					</p>
				</div>
			)}
		</div>
	);
}
