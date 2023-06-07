import type { Dispatch, SetStateAction } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { ListContacts200ItemsItem } from '@/lib/api/interfaces';
import type { FormValues } from '../../types';

import { useState } from 'react';
import { debounce } from 'throttle-debounce';
import { resetIdCounter, useCombobox } from 'downshift';
import clsx from 'clsx';

import { listContacts } from '@/lib/api/contact/contact';

interface Props {
	setValue: UseFormSetValue<FormValues>;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
}

export default function SearchContact({ setValue, setModalStatus }: Props) {
	resetIdCounter();
	const [items, setItems] = useState<ListContacts200ItemsItem[]>([]);

	const debounceSeach = debounce(400, async (inputValue) => {
		try {
			const { items } = await listContacts({
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
		},
		itemToString(item) {
			return item?.name ?? '';
		},
	});

	return (
		<div className={clsx('')}>
			<div>
				<input
					className={clsx(
						'block w-full px-3 py-2 text-sm rounded-lg border border-lg border-flyer-gray/30 bg-white',
						'focus:outline-none focus:border-flyer-gray focus:ring-flyer-graborder-flyer-gray'
					)}
					{...getInputProps({
						id: 'search-contact',
						type: 'search',
						placeholder: 'search contact...',
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
											{item.email}
										</span>
									</div>

									<span> {item.vat} </span>

									<button
										type='button'
										onClick={() => {
											setValue('contact', item.id);
											setModalStatus(false);
										}}
										className={clsx(
											'hidden px-2 text-xs rounded-lg bg-flyer-gray text-white',
											'group-hover:block'
										)}
									>
										set contact
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
