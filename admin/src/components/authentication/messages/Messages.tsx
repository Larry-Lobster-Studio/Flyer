import type { FC } from 'react';
import type { UiText } from '@ory/client';

import clsx from 'clsx';

interface MessageProps {
	message: UiText;
}

export const Message: FC<MessageProps> = ({ message }) => {
	console.log('message: ', message);
	return (
		<div className={clsx('text-sm font-light')}>
			<p> {message.text} </p>
		</div>
	);
};

interface MessagesProps {
	messages?: Array<UiText>;
}

export const Messages: FC<MessagesProps> = ({ messages }) => {
	if (!messages) {
		// No messages? Do nothing.
		return null;
	}

	return (
		<div className={clsx('mb-4')}>
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
		</div>
	);
};
