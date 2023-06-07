'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import {
	UseFieldArrayMove,
	FieldArrayWithId,
	UseFieldArrayRemove,
	UseFormGetValues,
	useFormContext,
} from 'react-hook-form';
import type { FormValues } from '../../types';

import { useState, useCallback, useMemo } from 'react';
import { add } from 'mathjs';
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import clsx from 'clsx';
import { PlusCircle } from '@phosphor-icons/react';

import { SortableBody } from './SortableBody';

interface Props {
	move: UseFieldArrayMove;
	remove: UseFieldArrayRemove;
	getValues: UseFormGetValues<FormValues>;
	fields: FieldArrayWithId<FormValues, 'items', 'id'>[];
	setModalStatus: Dispatch<SetStateAction<boolean>>;
}

export default function InvoiceItems({
	move,
	remove,
	getValues,
	fields,
	setModalStatus,
}: Props) {
	const { setValue } = useFormContext<FormValues>();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const getIndex = (id: UniqueIdentifier) =>
		fields.findIndex((f) => f.id === id);
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	const onSortEnd = useCallback(
		({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
			move(oldIndex, newIndex);

			getValues('items').map((item, index) => {
				setValue(`items.${index}.no`, (index + 1).toString().padStart(2, '0'));
			});
		},
		[fields]
	);

	const onRemove = useCallback(
		(index: number) => {
			remove(index);

			getValues('items').map((item, index) => {
				setValue(`items.${index}.no`, (index + 1).toString().padStart(2, '0'));
			});
		},
		[fields]
	);

	const { subTotal, total, taxAmount } = useMemo(() => {
		return {
			taxAmount: fields.reduce((accumulator, item) => {
				return add(accumulator, item.tax_amount);
			}, 0),
			subTotal: fields.reduce((accumulator, item) => {
				return add(accumulator, item.sub_total);
			}, 0),
			total: fields.reduce((accumulator, item) => {
				return add(accumulator, item.total);
			}, 0),
		};
	}, [fields]);

	return (
		<div className={clsx('mt-6')}>
			<DndContext
				sensors={sensors}
				autoScroll={false}
				onDragStart={({ active }) => {
					if (active) {
						setActiveId(active.id);
					}
				}}
				onDragEnd={({ active, over }) => {
					if (over && active.id !== over.id) {
						onSortEnd({
							oldIndex: getIndex(active.id),
							newIndex: getIndex(over.id),
						});
					}
					setActiveId(null);
				}}
				onDragCancel={() => setActiveId(null)}
			>
				<table className={clsx('w-full table-auto')}>
					<thead
						className={clsx(
							'text-xs text-left capitalize bg-flyer-white border-b border-flyer-gray/30'
						)}
					>
						<tr>
							<th className={clsx('px-2 py-3')} />
							<th className={clsx('pl-2 pr-6 py-3')}>n°</th>
							<th className={clsx('px-6 py-3')}>description</th>
							<th className={clsx('px-6 py-3')}>Qty</th>
							<th className={clsx('px-6 py-3')}>price</th>
							<th className={clsx('px-6 py-3')}>tax</th>
							<th className={clsx('px-6 py-3')}>amount</th>
							<th className={clsx('px-2 py-3')} />
						</tr>
					</thead>
					<SortableBody
						items={fields}
						activeId={activeId}
						removeItem={onRemove}
					/>
				</table>
			</DndContext>

			{/* Add item + sub total & tax amount */}
			<div
				className={clsx(
					'flex items-stretch justify-between gap-x-4 px-3 pt-4 pb-6 border-b border-flyer-gray/30'
				)}
			>
				<button
					type='button'
					onClick={() => setModalStatus(true)}
					className={clsx(
						'flex items-center gap-x-2 text-sm',
						'hover:text-flyer-primary'
					)}
				>
					<PlusCircle size={14} className={clsx('')} />
					<span> add line </span>
				</button>

				<table className={clsx('table-auto text-right')}>
					<tbody>
						<tr>
							<td className={clsx('pr-3')}>sub total: </td>
							<td>
								{new Intl.NumberFormat('be-NL', {
									style: 'currency',
									currency: 'EUR',
									currencySign: 'accounting',
								}).format(subTotal)}
							</td>
						</tr>
						<tr>
							<td className={clsx('pr-3')}>tax: </td>
							<td>
								{new Intl.NumberFormat('be-NL', {
									style: 'currency',
									currency: 'EUR',
									currencySign: 'accounting',
								}).format(taxAmount)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Total */}
			<div
				className={clsx(
					'flex items-stretch justify-end px-3 pt-4 pb-6 text-right'
				)}
			>
				<div>
					<span className={clsx('pr-3')}> Total: </span>
					<span>
						{new Intl.NumberFormat('be-NL', {
							style: 'currency',
							currency: 'EUR',
							currencySign: 'accounting',
						}).format(total)}
					</span>
				</div>
			</div>
		</div>
	);
}
