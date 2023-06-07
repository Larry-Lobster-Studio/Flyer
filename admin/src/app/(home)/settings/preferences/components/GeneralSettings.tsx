'use client';

import type { ICurrency, ILanguage } from '../types';

import { useState, useEffect, useCallback, Fragment } from 'react';
import clsx from 'clsx';
import { isEmpty } from 'ramda';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import {
	useGetCompanySettings,
	useUpdateCompanySettings,
} from '@/lib/api/company-settings/company-settings';
import { languageArray, currencyArray, timezoneArray } from '@/lib/arrays';

import { SearchSelectInput } from '@/components/input';

interface FormValues {
	language: ILanguage;
	currency: ICurrency;
	timezone: string;
}

export default function GeneralSettings() {
	const { data, isSuccess } = useGetCompanySettings();
	const { mutate } = useUpdateCompanySettings();
	const queryClient = useQueryClient();
	const [isLoading, setLoading] = useState(false);

	const { register, handleSubmit, reset, control, watch } = useForm<FormValues>(
		{
			defaultValues: {
				language: languageArray[0],
				currency: currencyArray[0],
				timezone: timezoneArray[0],
			},
		}
	);

	useEffect(() => {
		if (!isSuccess) return;

		reset({
			language: languageArray.find((lang) => lang.code === data.language),
			currency: currencyArray.find((curr) => curr.code === data.currency),
			timezone: timezoneArray.find((zone) => zone === data.time_zone),
		});
	}, [data, isSuccess]);

	const editGeneralSettings: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);
		console.log('values: ', values);

		try {
			mutate(
				{
					data: {
						currency: values.currency.code,
						language: values.language.code,
						time_zone: values.timezone,
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

	return (
		<div className={clsx('mt-10 px-6 pt-6 pb-8 bg-white rounded-xl shadow-lg')}>
			<form onSubmit={handleSubmit(editGeneralSettings)}>
				<div className={clsx('flex justify-between mb-8')}>
					<div className={clsx('')}>
						<h3 className={clsx('')}> Preferences</h3>
						<p className={clsx('text-sm text-flyer-gray')}>
							Default preferences for the system.
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

				<div
					className={clsx('flex flex-col gap-y-4', 'md:flex-row md:gap-x-4')}
				>
					{/* Currency selector */}
					<Controller
						control={control}
						name='currency'
						render={({ field: { value, name, onChange } }) => (
							<SearchSelectInput<ICurrency>
								name={name}
								label='currency'
								array={currencyArray}
								searchFilter={(arr, query) => {
									return arr.filter((item) =>
										item.name
											.toLowerCase()
											.replace(/\s+/g, '')
											.includes(query.toLowerCase().replace(/\s+/g, ''))
									);
								}}
								displayValue={(item) => {
									const symbol = !isEmpty(item.symbol)
										? `${item.symbol} - `
										: '';

									return symbol + item.name;
								}}
								selected={value}
								setSelected={(val) => onChange(val)}
								by='code'
							>
								{({ symbol, name }) => (
									<span
										className={clsx(
											'block truncate font-normal',
											'ui-selected:font-medium'
										)}
									>
										{!isEmpty(symbol) && `${symbol} - `} {name}
									</span>
								)}
							</SearchSelectInput>
						)}
					/>

					{/* Timezone selector */}
					<Controller
						control={control}
						name='timezone'
						render={({ field: { value, name, onChange } }) => (
							<SearchSelectInput<string>
								name={name}
								label='timezone'
								array={timezoneArray}
								searchFilter={(arr, query) => {
									return arr.filter((item) =>
										item
											.toLowerCase()
											.replace(/\s+/g, '')
											.includes(query.toLowerCase().replace(/\s+/g, ''))
									);
								}}
								displayValue={(item) => item}
								selected={value}
								setSelected={(val) => onChange(val)}
							>
								{(item) => (
									<span
										className={clsx(
											'block truncate font-normal',
											'ui-selected:font-medium'
										)}
									>
										{item}
									</span>
								)}
							</SearchSelectInput>
						)}
					/>
				</div>

				<div
					className={clsx(
						'flex flex-col gap-y-4 mt-6',
						'md:flex-row md:gap-x-4'
					)}
				>
					{/* Language Selector */}
					<Controller
						control={control}
						name='language'
						render={({ field: { value, name, onChange } }) => (
							<SearchSelectInput<ILanguage>
								name={name}
								label='language'
								array={languageArray}
								searchFilter={(arr, query) => {
									return arr.filter((item) =>
										item.name
											.toLowerCase()
											.replace(/\s+/g, '')
											.includes(query.toLowerCase().replace(/\s+/g, ''))
									);
								}}
								displayValue={(item) => item.name}
								selected={value}
								setSelected={(val) => onChange(val)}
								by='code'
							>
								{({ name }) => (
									<span
										className={clsx(
											'block truncate font-normal',
											'ui-selected:font-medium'
										)}
									>
										{name}
									</span>
								)}
							</SearchSelectInput>
						)}
					/>
				</div>
			</form>
		</div>
	);
}
