'use client';

import type { PaginationState } from '@tanstack/react-table';

import { useMemo, useState } from 'react';

import { useListContacts } from '@/lib/api/contact/contact';
import ContactsTable from './contacts.table';

export default function ListContacts() {
	const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isSuccess, refetch, isRefetching, isLoading } = useListContacts(
		{
			page: pageIndex,
			per_page: pageSize,
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
			{isSuccess && data?.items?.length > 0 ? (
				<ContactsTable
					tableData={data.items}
					totalItems={data?.total}
					pagination={pagination}
					setPagination={setPagination}
					pageCount={data?.total / pageSize}
				/>
			) : (
				<div>
					<p className='mb-4 text-slate-400 text-center text-lg'>
						{isLoading || isRefetching
							? 'Loading data'
							: 'There are no contacts yet'}
					</p>
				</div>
			)}
		</div>
	);
}
