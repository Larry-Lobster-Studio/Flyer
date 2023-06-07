import type { Dispatch, SetStateAction } from 'react';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateType);

interface Props {
	files: any[];
	setFiles: Dispatch<SetStateAction<any[]>>;
}

export default function ExpenseUload({ files, setFiles }: Props) {
	console.log(
		'files: ',
		files.map((f) => f)
	);
	return (
		<div className={clsx('flex flex-col gap-y-2 w-full h-full mt-4 mb-4')}>
			<FilePond
				id='expense-file-input'
				files={files}
				onupdatefiles={setFiles}
				allowMultiple={false}
				maxFiles={1}
				dropValidation={true}
				acceptedFileTypes={['image/*', 'application/pdf']}
				name='files'
				dropOnPage={true}
				instantUpload={false}
				storeAsFile={true}
				labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
			/>

			{files.length === 1 &&
				files.map((item) => {
					const blob = new Blob([item.file], { type: item.file.type });
					return (
						<div key={item.filename} className={clsx('w-full')}>
							<embed
								src={URL.createObjectURL(blob)}
								width='100%'
								height='600px'
							/>
						</div>
					);
				})}
		</div>
	);
}
