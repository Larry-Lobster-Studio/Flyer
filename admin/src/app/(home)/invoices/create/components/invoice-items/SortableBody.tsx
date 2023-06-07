'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { FieldArrayWithId } from 'react-hook-form';
import type { FormValues } from '../../types';

import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableRow } from './SortableRow';

interface Props {
	items: FieldArrayWithId<FormValues, 'items', 'id'>[];
	activeId: UniqueIdentifier | null;
	removeItem(index: number): void;
}

export function SortableBody({ items, activeId, removeItem }: Props) {
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
						/>
					);
				})}
			</tbody>
		</SortableContext>
	);
}
