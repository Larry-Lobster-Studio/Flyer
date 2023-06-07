import fs from 'fs';
import tmp from 'tmp';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { TemplateHandler } from 'easy-template-x';
import { createResolver } from 'easy-template-x-angular-expressions';

import prisma from '@/providers/database/prisma';
import { getObject, uploadObject } from '@/providers/storage/objects';
import { createId } from './createId';
import { config } from '@/config/main.config';

interface Props {
	companyId: string;
	temporary?: boolean;
	invoice: {
		invoice_number: string;
		invoice_date: string;
		due_date: string;
		sub_total: string;
		tax_amount: string;
		total: string;
		notes: string;
		contact: {
			name: string;
			email: string;
			vat: string;
			billing: {
				line_1: string;
				line_2: string;
				postal_code: string;
				city: string;
				country: string;
			};
		};
		items: {
			price: string;
			name: string;
			description: string;
			number: string;
			quantity: string;
			tax: string;
			tax_amount: string;
		}[];
	};
	templateId?: string;
}

export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('error', reject);
		stream.on('end', () => resolve(Buffer.concat(chunks)));
	});
}

export async function createInvoiceFile({
	companyId,
	temporary = false,
	invoice,
	templateId,
}: Props) {
	const tmpFolder = tmp.dirSync({ prefix: 'tmp-inv-' });
	const tmpTemplate = `${invoice.invoice_number}-tmp.docx`;
	const tmpFilledTemplate = `${invoice.invoice_number}-filled-tmp.docx`;
	let templateFile = fs.readFileSync('../../public/template1.docx');

	if (templateId) {
		const template = await prisma.file.findUnique({
			where: {
				id: templateId,
			},
		});

		if (template) {
			const { body } = await getObject(template.bucket, template.key);

			fs.writeFile(
				`${tmpFolder}${tmpTemplate}`,
				await streamToBuffer(body),
				(err) => {
					if (err) console.log(err);
					else templateFile = fs.readFileSync(`${tmpFolder}${tmpTemplate}`);
				}
			);
		}
	}

	const handler = new TemplateHandler({
		scopeDataResolver: createResolver(),
		delimiters: {
			tagStart: '{{',
			tagEnd: '}}',
		},
	});

	const bufferDocx = await handler.process(templateFile, invoice);
	fs.writeFileSync(`${tmpFolder}${tmpFilledTemplate}`, bufferDocx);

	const formData = new FormData();
	formData.append(
		'files',
		fs.createReadStream(`${tmpFolder}${tmpFilledTemplate}`)
	);

	const response = await fetch(
		`${config.gotenberg_url}/forms/libreoffice/convert`,
		{
			method: 'POST',
			body: formData,
			headers: formData.getHeaders(),
		}
	);

	let fileKey = createId('file');
	let key = `${companyId}/${fileKey}.pdf`;

	await uploadObject(
		config.s3.bucket,
		key,
		response.body!,
		'application/pdf',
		'max-age=31536000'
	);

	tmpFolder.removeCallback();

	const uploadFile = await prisma.file.create({
		data: {
			id: fileKey,
			key,
			bucket: config.s3.bucket,
			temporary,
			file_name: `${invoice.invoice_number}.pdf`,
			invoice: {
				connect: {
					company_id_invoice_number: {
						company_id: companyId,
						invoice_number: invoice.invoice_number,
					},
				},
			},
		},
		select: {
			id: true,
			file_name: true,
			temporary: true,
			key: true,
			bucket: true,
			updated_at: true,
			created_at: true,
		},
	});

	return uploadFile;
}
