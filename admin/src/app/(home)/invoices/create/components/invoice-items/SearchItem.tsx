import type { UseFormReset } from 'react-hook-form';
import type { ListItems200ItemsItem } from '@/lib/api/interfaces';
import type { FormItemValues } from '../../types';

import { useState } from 'react';
import { debounce } from 'throttle-debounce';
import { resetIdCounter, useCombobox } from 'downshift';
import clsx from 'clsx';

import { listItems } from '@/lib/api/item/item';

interface Props {
	reset: UseFormReset<FormItemValues>;
}

export default function SearchItem({ reset }: Props) {
	resetIdCounter();
	const [items, setItems] = useState<ListItems200ItemsItem[]>([]);

	const debounceSeach = debounce(400, async (inputValue) => {
		try {
			const { items } = await listItems({
				per_page: 25,
				search: inputValue,
			});

			setItems(items);
		} catch (error) {
			setItems([]);
		}
	});

	const {
		isOpen,
		getMenuProps,
		getInputProps,
		getItemProps,
		getToggleButtonProps,
		selectedItem,
		highlightedIndex,
	} = useCombobox({
		items,
		onInputValueChange({ inputValue }) {
			console.debug('Input changed');
			debounceSeach(inputValue);
		},
		onSelectedItemChange({ selectedItem }) {
			console.debug('Selected item changed');

			reset({
				name: selectedItem?.name,
				description: selectedItem?.description ?? '',
				price: Number(selectedItem?.price),
				tax: Number(selectedItem?.tax),
				unit: selectedItem?.unit,
			});
		},
		itemToString(item) {
			return item?.name ?? '';
		},
	});

	return (
		<div className={clsx('mt-4')}>
			<div>
				<label
					htmlFor='search-item-client'
					className={clsx('relative text-sm lowercase')}
				>
					search client
				</label>
				<input
					className={clsx(
						'block w-full px-3 py-2 text-sm rounded-lg border border-lg border-flyer-gray/30 bg-white',
						'focus:outline-none focus:border-flyer-gray focus:ring-flyer-graborder-flyer-gray'
					)}
					{...getInputProps({
						id: 'search-item-client',
						type: 'search',
						placeholder: 'search client...',
					})}
				/>
				<button
					saria-label='toggle menu'
					type='button'
					{...getToggleButtonProps()}
				></button>
			</div>

			{isOpen && (
				<div>
					<ul {...getMenuProps({}, { suppressRefError: true })}>
						{items.map((item, index) => {
							return (
								<li
									key={item.id}
									className={clsx(
										'group flex items-stretch justify-between gap-x-3 px-3 py-1',
										'hover:bg-flyer-primary/60',
										highlightedIndex === index && 'bg-flyer-primary'
									)}
									{...getItemProps({ item, index })}
								>
									<div className={clsx('flex flex-col')}>
										<span>{item.name}</span>
										<span className={clsx('text-xs text-flyer-gray')}>
											{item.description}
										</span>
									</div>

									<span> {item.price} </span>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
