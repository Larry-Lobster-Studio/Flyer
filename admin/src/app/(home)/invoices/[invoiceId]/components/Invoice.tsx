'use contact';

import clsx from 'clsx';
import { differenceInDays, format, isAfter } from 'date-fns';

import { useGetInvoice } from '@/lib/api/invoice/invoice';

interface Props {
	invoiceId: string;
}

export default function Invoice({ invoiceId }: Props) {
	const { data, isSuccess } = useGetInvoice(invoiceId);

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
							<span> N° </span>
							<span> {data?.invoice_number} </span>
						</div>
						<div
							className={clsx('flex items-start justify-between gap-x-3 mb-2')}
						>
							<span> Due date </span>
							{isSuccess && (
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
			</div>

			{isSuccess && (
				<div className={clsx('w-full', 'sm:w-4/6')}>
					<object
						data={`${data.document.url}#&toolbar=0&navpanes=0`}
						width='100%'
						height='600px'
					/>
				</div>
			)}
		</div>
	);
}
