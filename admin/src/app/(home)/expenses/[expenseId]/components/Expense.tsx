'use client';

import clsx from 'clsx';
import { differenceInDays, format, isAfter } from 'date-fns';

import { useGetExpense } from '@/lib/api/expense/expense';

interface Props {
	expenseId: string;
}

export default function Expense({ expenseId }: Props) {
	const { data, isSuccess } = useGetExpense(expenseId);

	console.log('data: ', data);

	return (
		<div
			className={clsx(
				'flex flex-col gap-y-4',
				'sm:flex-row sm:justify-between sm:gap-x-8'
			)}
		>
			<div className={clsx('flex-grow')}>
				<div className={clsx('mb-4 px-4 pt-4 pb-6 rounded-lg bg-white')}>
					<h3 className={clsx('font-semibold')}> Information </h3>

					<div className={clsx('mt-4')}>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> Due date </span>
							{isSuccess && data.due_date && (
								<span
									className={clsx(
										'rounded',
										isAfter(new Date(), new Date(data.due_date)) &&
											'px-2 py-1 text-sm bg-red-600 text-white',
										differenceInDays(new Date(data.due_date), new Date()) <=
											5 && 'px-2 py-1 text-sm bg-orange-600 text-white'
									)}
								>
									{format(new Date(data.due_date), 'dd MMM yyyy')}
								</span>
							)}
						</div>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> Status </span>
							<span> {data?.status} </span>
						</div>
					</div>
				</div>

				<div className={clsx('px-4 pt-4 pb-6 rounded-lg bg-white')}>
					<h3 className={clsx('font-semibold')}> Contact info </h3>

					<div className={clsx('mt-4')}>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> name </span>
							<span> {data?.contact.name} </span>
						</div>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> VAT </span>
							<span> {data?.contact.vat} </span>
						</div>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> address </span>
							<div className={clsx('flex flex-col text-right')}>
								<span>
									{data?.contact.billing_address?.line_1}{' '}
									{data?.contact.billing_address?.line_2}
								</span>
								<span>
									{data?.contact.billing_address?.postal_code}{' '}
									{data?.contact.billing_address?.city},{' '}
									{data?.contact.billing_address?.country}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className={clsx('mb-4 px-4 pt-4 pb-6 rounded-lg bg-white')}>
					<h3 className={clsx('font-semibold')}> Items </h3>

					<div className={clsx('mt-4')}>
						{data?.items.map((item) => {
							return (
								<div key={item.id} className={clsx('')}>
									<div
										className={clsx(
											'flex items-start justify-between gap-x-3 mb-2'
										)}
									>
										<span>{item.category}</span>
										<span>
											{new Intl.NumberFormat('be-NL', {
												style: 'currency',
												currency: data.currency,
												currencySign: 'accounting',
											}).format(Number(item.sub_total))}{' '}
										</span>
										<span>
											{new Intl.NumberFormat('be-NL', {
												style: 'currency',
												currency: data.currency,
												currencySign: 'accounting',
											}).format(Number(item.total))}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{isSuccess && (
				<div className={clsx('w-full', 'sm:w-4/6')}>
					{data.document ? (
						<object
							data={`${data.document.url}#&toolbar=0&navpanes=0`}
							width='100%'
							height='600px'
						/>
					) : (
						<div
							className={clsx(
								'w-full h-full flex items-center justify-center text-flyer-gray border border-dashed rounded-lg bg-flyer-gray/10 '
							)}
						>
							<span className={clsx('text-xl')}> No document yet </span>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
