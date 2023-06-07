'use client';

import type { PaginationState } from '@tanstack/react-table';

import { useMemo, useState } from 'react';

import { useListExpenses } from '@/lib/api/expense/expense';
import { ExpensesTable } from './Expenses.table';

export function ListExpenses() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isSuccess, refetch, isRefetching, isLoading } = useListExpenses(
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
				<ExpensesTable
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
							: 'There are no expenses yet'}
					</p>
				</div>
			)}
		</div>
	);
}
