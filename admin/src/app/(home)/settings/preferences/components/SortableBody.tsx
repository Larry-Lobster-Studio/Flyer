'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { FieldArrayWithId, UseFormRegister } from 'react-hook-form';
import type { InvoiceFormValues } from '../types';

import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableRow } from './SortableRow';

interface Props {
	items: FieldArrayWithId<InvoiceFormValues, 'format', 'id'>[];
	activeId: UniqueIdentifier | null;
	removeItem(index: number): void;
	register: UseFormRegister<InvoiceFormValues>;
}

export function SortableBody({ items, activeId, removeItem, register }: Props) {
	return (
		<SortableContext items={items} strategy={verticalListSortingStrategy}>
			<tbody>
				{items.map((item, index) => {
					return (
						<SortableRow
							key={`row-${item.id}`}
							id={item.id}
							index={index}
							item={item}
							activeId={activeId}
							removeItem={removeItem}
							register={register}
						/>
					);
				})}
			</tbody>
		</SortableContext>
	);
}
