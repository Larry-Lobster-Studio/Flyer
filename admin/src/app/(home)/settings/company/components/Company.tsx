'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import { useGetCompany, useUpdateCompany } from '@/lib/api/company/company';

import { TextInput } from '@/components/input';

interface FormValues {
	name: string;
	logo?: string;
	phone?: string;
	address?: {
		line_1: string;
		line_2?: string;
		postal_code: string;
		city: string;
		state?: string;
		country: string;
	};
}

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

export default function Company() {
	const { data, isSuccess } = useGetCompany();
	const { mutate } = useUpdateCompany();
	const queryClient = useQueryClient();
	const [files, setFiles] = useState<any[]>([]);
	const [isLoading, setLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm<FormValues>();

	useEffect(() => {
		if (!isSuccess) return;

		reset({
			name: data.name,
			phone: data.phone ?? undefined,
			address: {
				line_1: data.address?.line_1,
				line_2: data.address?.line_2 ?? undefined,
				postal_code: data.address?.postal_code,
				city: data.address?.city,
				state: data.address?.state ?? undefined,
				country: data.address?.country,
			},
		});
	}, [data, isSuccess]);

	const editCompany: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);
		console.log('values: ', values);

		try {
			mutate(
				{
					data: {
						...values,
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
			<h3 className={clsx('mb-4')}> general </h3>

			<div className={clsx('flex flex-col gap-y-2 w-full mb-4')}>
				<label
					htmlFor='logo-input'
					className={clsx('relative text-sm lowercase')}
				>
					logo
				</label>
				<FilePond
					id='logo-input'
					files={files}
					onupdatefiles={setFiles}
					allowMultiple={false}
					maxFiles={1}
					dropValidation={true}
					acceptedFileTypes={['image/*']}
					name='files'
					labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
				/>
			</div>

			<form onSubmit={handleSubmit(editCompany)} className={clsx('')}>
				<div
					className={clsx('flex flex-col gap-y-4', 'md:flex-row md:gap-x-4')}
				>
					<TextInput
						label='name'
						type='text'
						placeholder='item name'
						disabled={isLoading}
						{...register('name')}
					/>
					<TextInput
						label='phone'
						type='tel'
						placeholder='phone'
						disabled={isLoading}
						{...register('phone')}
					/>
				</div>

				<h3 className={clsx('mt-8 mb-4')}> address </h3>

				<div
					className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
				>
					<TextInput
						label='line 1'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.line_1')}
					/>

					<TextInput
						label='line 2'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.line_2')}
					/>
				</div>

				<div
					className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
				>
					<TextInput
						label='Postal code'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.postal_code')}
					/>

					<TextInput
						label='city'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.city')}
					/>
				</div>

				<div
					className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
				>
					<TextInput
						label='state'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.state')}
					/>

					<TextInput
						label='country'
						type='text'
						placeholder='name'
						disabled={isLoading}
						{...register('address.country')}
					/>
				</div>

				<div className={clsx('flex items-center justify-end gap-x-3 mt-6')}>
					<button
						type='submit'
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
							'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
						)}
					>
						save
					</button>
				</div>
			</form>

			<div className={clsx('mt-8 pt-5 border-t border-t-flyer-gray/20')}>
				<h2 className={clsx('font-semibold')}>Delete company</h2>
				<span className={clsx('text-flyer-gray')}>
					Once you delete your company, you will lose all the data and files
					associated with it permanently.
				</span>

				<div className={clsx('flex items-center justify-end gap-x-3 mt-6')}>
					<button
						type='submit'
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-red-500 bg-red-500 text-white',
							'hover:bg-red-800 hover:border-redbg-red-800'
						)}
					>
						delete
					</button>
				</div>
			</div>
		</div>
	);
}
