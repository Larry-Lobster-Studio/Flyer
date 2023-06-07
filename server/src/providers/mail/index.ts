import { createTransport } from 'nodemailer';

import { config } from '@/config/main.config';
import Mail from 'nodemailer/lib/mailer';

interface Props {
	from: string | Mail.Address;
	to: string | Mail.Address | (string | Mail.Address)[];
	cc?: string | Mail.Address | (string | Mail.Address)[];
	bcc?: string | Mail.Address | (string | Mail.Address)[];
	subject: string;
	text: string;
	template?: any;
	attachments?: Mail.Attachment[];
}

export default async function sendMail({
	from,
	to,
	cc,
	bcc,
	subject,
	text,
	template,
	attachments,
}: Props) {
	const transporter = createTransport({
		host: config.email.transport.host,
		port: config.email.transport.port,
		auth: config.email.transport.auth,
		secure: config.email.transport.port === 465,
		tls: {
			rejectUnauthorized: config.environment === 'development' ? false : true,
		},
	});

	const options: Mail.Options = {
		from,
		to,
		cc,
		bcc,
		subject,
		text,
		attachments,
	};

	const t = await transporter.sendMail(options);

	console.log('t: ', t);
	return true;
}
