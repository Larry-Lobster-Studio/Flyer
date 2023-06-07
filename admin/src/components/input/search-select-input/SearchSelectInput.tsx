'use client';

import type { ReactElement } from 'react';
import type { ByComparator } from '@headlessui/react/dist/types';

import { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Combobox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';

import { InputWrapper } from '../input-wrapper';

interface Props<ArrayValue> {
	error?: string;
	label: string;
	name: string;
	required?: boolean;
	array: ArrayValue[];
	selected: ArrayValue;
	setSelected(value: ArrayValue): void;
	searchFilter(array: ArrayValue[], query: string): ArrayValue[];
	children(item: ArrayValue): ReactElement;
	displayValue(item: ArrayValue): string;
	by?: ByComparator<ArrayValue> | undefined;
}

export default function SearchSelectInput<ArrayValue>({
	error,
	label,
	name,
	required = false,
	array,
	selected,
	setSelected,
	searchFilter,
	children,
	displayValue,
	by,
}: Props<ArrayValue>) {
	const [query, setQuery] = useState('');

	const filteredArray = query === '' ? array : searchFilter(array, query);

	return (
		<InputWrapper error={error} label={label} name={name} required={required}>
			<Combobox value={selected} onChange={setSelected} name={name} by={by}>
				<div className={clsx('relative w-full')}>
					<div
						className={clsx(
							'relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left',
							'sm:text-sm',
							'focus:outline-none',
							'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300'
						)}
					>
						<Combobox.Input
							displayValue={(item: ArrayValue) => displayValue(item)}
							onChange={(event) => setQuery(event.target.value)}
							className={clsx(
								'block w-full px-3 py-2 text-sm rounded-lg border border-lg border-flyer-gray/30 bg-white',
								'focus:outline-none focus:border-flyer-gray focus:ring-flyer-graborder-flyer-gray'
							)}
						/>
						<Combobox.Button
							className={clsx(
								'absolute inset-y-0 right-0 flex items-center pr-2'
							)}
						>
							<CaretUpDown size={16} />
						</Combobox.Button>
					</div>

					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options
							className={clsx(
								'z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5  ',
								'sm:text-sm',
								'focus:outline-none'
							)}
						>
							{filteredArray.length === 0 && query !== '' ? (
								<div
									className={clsx(
										'relative cursor-default select-none py-2 px-4 text-gray-700'
									)}
								>
									nothing found
								</div>
							) : (
								filteredArray.map((item, index) => {
									return (
										<Combobox.Option
											key={`${name}-${index}`}
											value={item}
											className={clsx(
												'relative cursor-default select-none py-2 pl-4 pr-4 text-gray-900',
												'ui-active:bg-flyer-gray ui-active:text-white'
											)}
										>
											<div className={clsx('flex items-center gap-x-5')}>
												<Check
													size={16}
													className={clsx('hidden', 'ui-selected:block')}
												/>

												<div className={clsx('pl-9', 'ui-selected:pl-0')}>
													{children(item)}
												</div>
											</div>
										</Combobox.Option>
									);
								})
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</InputWrapper>
	);
}
