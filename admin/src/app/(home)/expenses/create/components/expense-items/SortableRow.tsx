'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { NewIndexGetter } from '@dnd-kit/sortable';
import type { FormItemValues } from '../../types';

import { useMemo } from 'react';
import { multiply, evaluate } from 'mathjs';
import { useSortable } from '@dnd-kit/sortable';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import clsx from 'clsx';
import {
	DotsSixVertical,
	DotsThreeVertical,
	TrashSimple,
} from '@phosphor-icons/react';

interface Props {
	id: UniqueIdentifier;
	index: number;
	getNewIndex?: NewIndexGetter;
	item: FormItemValues;
	activeId: UniqueIdentifier | null;
	removeItem(index: number): void;
}

export function SortableRow({
	id,
	index,
	getNewIndex,
	item,
	activeId,
	removeItem,
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
				<span> {item.category} </span>
			</td>
			<td className={clsx('px-6 py-4')}>
				<div className={clsx('flex flex-col gap-y-1')}>
					<span> {item.description} </span>
				</div>
			</td>

			<td className={clsx('px-6 py-4')}>
				<span>
					{new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
						currencySign: 'accounting',
					}).format(item.sub_total)}
				</span>
			</td>

			<td className={clsx('px-6 py-4')}>
				<span>
					{new Intl.NumberFormat('be-NL', {
						style: 'currency',
						currency: 'EUR',
						currencySign: 'accounting',
					}).format(item.total)}
				</span>
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

					<button type='button'>
						<DotsThreeVertical size={21} />
					</button>
				</div>
			</td>
		</tr>
	);
}
