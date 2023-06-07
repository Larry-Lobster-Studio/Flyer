'use client';

import type { UniqueIdentifier } from '@dnd-kit/core';
import type { InvoiceFormValues } from '../types';

import { useState, useEffect, useCallback, Fragment } from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Menu, Transition } from '@headlessui/react';
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';

import {
	useGetCompanySettings,
	useUpdateCompanySettings,
} from '@/lib/api/company-settings/company-settings';

import { SortableBody } from './SortableBody';

const formatOptions = [
	{
		name: 'series',
		description:
			'To set a static prefix/postfix like "INV" across your company.',
		value: 'INV',
	},
	{
		name: 'delimiter',
		description:
			'Single character for specifying the boundary between 2 separate components. By default its set to -',
		value: '-',
	},
	{
		name: 'sequence',
		description:
			'Consecutive sequence of numbers across your company. You can specify the length on the given parameter.',
		value: '6',
	},
	{
		name: 'date format',
		description:
			'A local date and time field which accepts a format parameter.',
		value: 'YYY',
	},
];

export default function InvoiceSettings() {
	const { data, isSuccess } = useGetCompanySettings();
	const { mutate } = useUpdateCompanySettings();
	const queryClient = useQueryClient();
	const [example, setExample] = useState('');
	const [isLoading, setLoading] = useState(false);

	const { register, handleSubmit, reset, control, watch } =
		useForm<InvoiceFormValues>();

	const { append, fields, remove, move } = useFieldArray({
		control: control,
		name: 'format',
	});

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

	useEffect(() => {
		if (!isSuccess) return;

		const regex = /{{(.*?)}}/g;
		const matches = data?.invoice_format.match(regex);

		if (matches) {
			const values = matches.map((match) => {
				const [name, value] = match.replace(/[{}]/g, '').split(':');
				const formattedName = name.toLowerCase().split('_').join(' ');

				return {
					component: {
						name: formattedName,
						description:
							formatOptions.find((opt) => opt.name === formattedName)
								?.description ?? '',
					},
					value,
				};
			});

			return reset({ format: values });
		}
	}, [data, isSuccess]);

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			console.log(value, name, type);

			let invoiceNumber = '';

			if (value.format)
				for (let component of value.format) {
					switch (component?.component?.name) {
						case 'series':
						case 'delimiter':
							invoiceNumber += component.value;
							break;

						case 'sequence':
							const sequenceLength = parseInt(component.value ?? '');
							const sequence = Math.ceil(Math.random() * 10)
								.toString()
								.padStart(sequenceLength, '0');

							invoiceNumber += sequence;
							break;

						case 'date format':
							const dateFormat = component.value ?? '';
							const currentDate = new Date();
							const formattedDate = format(currentDate, dateFormat);

							invoiceNumber += formattedDate;
							break;
					}
				}

			setExample(invoiceNumber);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onSortEnd = useCallback(
		({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
			move(oldIndex, newIndex);
		},
		[fields]
	);

	const editInvoiceSettings: SubmitHandler<InvoiceFormValues> = async (
		values
	) => {
		setLoading(true);
		console.log('values: ', values);

		try {
			const formattedValues = values.format.map(({ component, value }) => {
				const formattedName = component.name
					.split(' ')
					.map((word) => word.toUpperCase())
					.join('_');

				return `{{${formattedName}:${value}}}`;
			});

			mutate(
				{
					data: {
						invoice_format: formattedValues.join(''),
					},
				},
				{
					onSuccess(data, variables, context) {
						setLoading(false);
						queryClient.invalidateQueries({
							queryKey: ['/v1/company'],
						});
					},
					onError(error, variables, context) {
						setLoading(false);
					},
				}
			);
		} catch (error) {
			console.error;
			setLoading(false);
		}
	};

	const onRemove = useCallback(
		(index: number) => {
			remove(index);
		},
		[fields]
	);

	return (
		<div className={clsx('mt-10 px-6 pt-6 pb-8 bg-white rounded-xl shadow-lg')}>
			<form onSubmit={handleSubmit(editInvoiceSettings)}>
				<div className={clsx('flex justify-between mb-8')}>
					<div className={clsx('')}>
						<h3 className={clsx('')}> Invoice Number Format </h3>
						<p className={clsx('text-sm text-flyer-gray')}>
							Customize how your invoice number gets generated automatically
							when you create a new invoice.
						</p>
					</div>

					<div>
						<button
							type='submit'
							className={clsx(
								'flex items-center gap-x-2 px-3 py-2 h-full text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
								'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
							)}
						>
							save
						</button>
					</div>
				</div>

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
								<th className={clsx('pl-2 pr-6 py-3')}>component</th>
								<th className={clsx('px-6 py-3')}>parameter</th>
								<th className={clsx('px-2 py-3')} />
							</tr>
						</thead>
						<SortableBody
							items={fields}
							activeId={activeId}
							removeItem={onRemove}
							register={register}
						/>
					</table>
				</DndContext>
			</form>

			<div className={clsx('flex justify-between gap-x-4 mt-4')}>
				<div>
					<span> Example: </span>
					<span> {example} </span>
				</div>

				<Menu as='div' className={clsx('relative inline-block')}>
					<Menu.Button
						type='button'
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 h-full text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
							'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
						)}
					>
						Add option
					</Menu.Button>

					<Transition
						as={Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							className={clsx(
								'absolute right-0 w-56 mt-2 p-1 origin-top-right rounded-md bg-white shadow-lg'
							)}
						>
							{formatOptions.map((option, index) => {
								return (
									<Menu.Item key={option.name}>
										{({ active }) => {
											return (
												<button
													type='button'
													onClick={() => {
														append({
															component: {
																name: option.name,
																description: option.description,
															},
															value: option.value,
														});
													}}
													className={clsx(
														'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
														active && 'bg-flyer-gray text-white'
													)}
												>
													{option.name}
												</button>
											);
										}}
									</Menu.Item>
								);
							})}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	);
}
