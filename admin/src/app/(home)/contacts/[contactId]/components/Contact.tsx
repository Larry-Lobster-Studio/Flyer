'use client';

import clsx from 'clsx';

import { useGetContact } from '@/lib/api/contact/contact';

interface Props {
	contactId: string;
}

export default function Contact({ contactId }: Props) {
	const { data, isSuccess } = useGetContact(contactId);

	return (
		<div
			className={clsx(
				'flex flex-col gap-y-4',
				'sm:flex-row sm:justify-between sm:gap-x-8'
			)}
		>
			<div>
				<div className={clsx('mb-4 px-4 pt-4 pb-6 rounded-lg bg-white')}>
					<div className={clsx('mb-2')}>
						<span className={clsx('text-flyer-gray')}>contact</span>
						<div className={clsx('flex flex-col mt-2')}>
							<span> {data?.name} </span>
							<a href={`mailto:${data?.email}`}> {data?.email} </a>
							<a href={`tel:${data?.phone}`}> {data?.phone} </a>
							<span> {data?.vat} </span>
							{data?.website && (
								<a href={data.website} target='_blank'>
									{data.website}
								</a>
							)}
						</div>
					</div>
				</div>

				<div className={clsx('pl-4 pr-8 pt-4 pb-6 rounded-lg bg-white')}>
					{/* Billing address */}
					<div className={clsx('mb-6')}>
						<span className={clsx('text-flyer-gray')}>billing address</span>
						<div className={clsx('flex flex-col mt-2')}>
							<span>
								{data?.billing_address?.line_1} {data?.billing_address?.line_2}
							</span>
							<span>
								{data?.billing_address?.postal_code}
								{data?.billing_address?.city}, {data?.billing_address?.country}
							</span>
						</div>
					</div>

					{/* Shipping address */}
					<div className={clsx('mb-2')}>
						<span className={clsx('text-flyer-gray')}>shipping address </span>
						<div className={clsx('flex flex-col mt-2')}>
							<span>
								{data?.shipping_address?.line_1}
								{data?.shipping_address?.line_2}
							</span>
							<span>
								{data?.shipping_address?.postal_code}
								{data?.shipping_address?.city},{data?.shipping_address?.country}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className={clsx('flex-grow')}>
				{/* Stats */}
				<div
					className={clsx(
						'flex items-stretch justify-between gap-x-3 mb-6 px-8 py-6 rounded-lg bg-flyer-gray/20'
					)}
				>
					<div className={clsx('flex flex-col gap-y-2')}>
						<span className={clsx('text-flyer-gray')}> Total unpaid </span>
						<span className={clsx('text-lg proportional-nums')}> 23232 </span>
					</div>

					<div className={clsx('flex flex-col gap-y-2')}>
						<span className={clsx('text-flyer-gray')}>Paid last 12 months</span>
						<span className={clsx('text-lg proportional-nums')}> 23232 </span>
					</div>
				</div>

				{/* Unpaid invoices */}
				<div>
					<h3> Unpaid invoices </h3>
				</div>
			</div>
		</div>
	);
}
