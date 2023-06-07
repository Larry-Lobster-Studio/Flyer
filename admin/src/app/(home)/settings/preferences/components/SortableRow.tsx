'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { NewIndexGetter } from '@dnd-kit/sortable';
import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import type { InvoiceFormValues } from '../types';

import { useSortable } from '@dnd-kit/sortable';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { DotsSixVertical, TrashSimple } from '@phosphor-icons/react';
import { TextInput } from '@/components/input';

interface Props {
	id: UniqueIdentifier;
	index: number;
	getNewIndex?: NewIndexGetter;
	item: FieldArrayWithId<InvoiceFormValues, 'format', 'id'>;
	activeId: UniqueIdentifier | null;
	removeItem(index: number): void;
	register: UseFormRegister<InvoiceFormValues>;
}

export function SortableRow({
	id,
	index,
	getNewIndex,
	item,
	activeId,
	removeItem,
	register,
}: Props) {
	const {
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		attributes,
		isDragging,
		isSorting,
		listeners,
	} = useSortable({
		id,
		getNewIndex,
	});

	const style = {
		transform: cssDndKit.Transform.toString(transform),
		transition,
	};

	// const { total } = useMemo(() => {
	// 	const subTotal = multiply(item.price, item.quantity);
	// 	return {
	// 		total: evaluate(`${subTotal} + ${item.tax}%`),
	// 	};
	// }, [item]);

	return (
		<tr
			ref={setNodeRef}
			style={style}
			className={clsx('bg-white', activeId === id && 'bg-rose-200')}
			{...attributes}
		>
			<td>
				<button
					ref={setActivatorNodeRef}
					type='button'
					className={clsx('', isDragging ? 'cursor-grabbing' : 'cursor-grab')}
					{...listeners}
				>
					<DotsSixVertical size={21} className={clsx('')} />
				</button>
			</td>
			<td className={clsx('pl-2 pr-6 py-4')}>
				<div className={clsx('flex flex-col gap-y-1')}>
					<span> {item.component.name} </span>
					<span> {item.component.description} </span>
				</div>
			</td>
			<td className={clsx('px-6 py-4')}>
				<TextInput
					label={`${item.component.name} value`}
					type='text'
					placeholder='value'
					{...register(`format.${index}.value`)}
				/>
			</td>

			<td className={clsx('px-2 py-4')}>
				<div className={clsx('flex items-center justify-end gap-x-2')}>
					<button
						type='button'
						onClick={() => {
							removeItem(index);
						}}
						className={clsx('', 'hover:text-rose-600')}
					>
						<TrashSimple size={21} />
					</button>
				</div>
			</td>
		</tr>
	);
}
