'use client';

import type { PaginationState } from '@tanstack/react-table';

import { useMemo, useState } from 'react';
import clsx from 'clsx';

import { useListItems } from '@/lib/api/item/item';

import ItemsTable from './Items.table';

export default function ListItems() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isSuccess, refetch, isRefetching, isLoading } = useListItems(
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
		<div className={clsx('mt-10')}>
			{isSuccess && data.items.length ? (
				<ItemsTable
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
							: 'There are no items yet'}
					</p>
				</div>
			)}
		</div>
	);
}
