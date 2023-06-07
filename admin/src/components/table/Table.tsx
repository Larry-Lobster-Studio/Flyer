import { Dispatch, SetStateAction } from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import {
	CaretDoubleLeft,
	CaretDoubleRight,
	CaretLeft,
	CaretRight,
} from '@phosphor-icons/react';

interface Props {
	columns: ColumnDef<any>[];
	data: any[];
	totalItems: number;
	pageCount: number;
	pagination: PaginationState;
	setPagination: Dispatch<SetStateAction<PaginationState>>;
	sorting?: SortingState;
	setSorting?: Dispatch<SetStateAction<SortingState>>;
}

const Table = ({
	columns,
	data,
	totalItems,
	pageCount,
	pagination,
	setPagination,
	sorting,
	setSorting,
}: Props) => {
	const table = useReactTable({
		data,
		columns,
		pageCount: pageCount ?? -1,
		state: {
			pagination,
			sorting,
		},

		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
	});

	return (
		<div className='relative -my-2 overflow-x-auto '>
			<div className='py-2 align-middle inline-block min-w-full'>
				<div className='border-b border-gray-200'>
					<table className='min-w-full divide-y divide-gray-200'>
						{/* Table heading */}
						<thead className=''>
							{table.getHeaderGroups().map((headerGroup) => {
								return (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<th
													key={header.id}
													colSpan={header.colSpan}
													className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
												>
													{header.isPlaceholder ? null : (
														<div
															onClick={header.column.getToggleSortingHandler()}
															className={clsx(
																header.column.getCanSort()
																	? 'cursor-pointer select-none'
																	: null
															)}
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
															{{
																asc: ' 🔼',
																desc: ' 🔽',
															}[header.column.getIsSorted() as string] ?? null}
														</div>
													)}
												</th>
											);
										})}
									</tr>
								);
							})}
						</thead>

						{/* Table Body */}
						<tbody className='bg-white divide-y divide-gray-200'>
							{table.getRowModel().rows.map((row) => (
								<tr
									key={row.id}
									className={clsx(
										'hover:bg-flyer-primary',
										'odd:bg-white',
										'even:bg-zinc-100/75'
									)}
								>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className='px-6 py-4 whitespace-nowrap'>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				<div className='flex items-center justify-between mt-8 px-6'>
					{/* Showing # of results */}
					<div className='flex items-center gap-x-1 text-sm text-slate-400'>
						<span>
							showing{' '}
							{table.getState().pagination.pageIndex *
								table.getState().pagination.pageSize +
								1}{' '}
							to{' '}
							{table.getState().pagination.pageIndex *
								table.getState().pagination.pageSize +
								data.length}{' '}
							of {totalItems} results
						</span>
					</div>

					{/* Navigation */}
					<div className='inline-flex items-center gap-x-4 '>
						<nav
							className='z-0 relative inline-flex space-x-3'
							aria-label='Pagination'
						>
							{/* First */}
							<button
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
								className={clsx(
									'relative inline-flex items-center px-2 py-2 rounded-full bg-gray-100 text-sm font-medium text-black cursor-pointer',
									'hover:text-white hover:bg-black',
									'disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100'
								)}
							>
								<span className='sr-only'>First</span>
								<CaretDoubleLeft size={12} />{' '}
							</button>

							{/* Previous */}
							<button
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								className={clsx(
									'relative inline-flex items-center px-2 py-2 rounded-full bg-gray-100 text-sm font-medium text-black cursor-pointer',
									'hover:text-white hover:bg-black',
									'disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100'
								)}
							>
								<span className='sr-only'>Previous</span>
								<CaretLeft size={12} />
							</button>

							{/* Next */}
							<button
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className={clsx(
									'relative inline-flex items-center px-2 py-2 rounded-full bg-gray-100 text-sm font-medium text-black cursor-pointer',
									'hover:text-white hover:bg-black',
									'disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100'
								)}
							>
								<span className='sr-only'>Next</span>
								<CaretRight size={12} />
							</button>

							{/* Last */}
							<button
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={!table.getCanNextPage()}
								className={clsx(
									'relative inline-flex items-center px-2 py-2 rounded-full bg-gray-100 text-sm font-medium text-black cursor-pointer',
									'hover:text-white hover:bg-black',
									'disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100'
								)}
							>
								<span className='sr-only'>Last</span>
								<CaretDoubleRight size={12} />
							</button>
						</nav>

						{/* Go to page */}
						<span className='flex items-center gap-x-2 text-sm'>
							go to page:
							<input
								type='number'
								defaultValue={table.getState().pagination.pageIndex + 1}
								min={1}
								max={pageCount}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									table.setPageIndex(page);
								}}
								className='w-16 p-1 border border-gray-300 rounded'
							/>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
