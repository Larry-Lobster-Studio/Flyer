import type { FC } from 'react';
import type { UiNode, UiNodeTextAttributes, UiText } from '@ory/client';

import clsx from 'clsx';

interface Props {
	node: UiNode;
	attributes: UiNodeTextAttributes;
}

const Content: FC<Props> = ({ node, attributes }) => {
	switch (attributes.text.id) {
		case 1050015:
			// This text node contains lookup secrets. Let's make them a bit more beautiful!
			const secrets = (attributes.text.context as any).secrets.map(
				(text: UiText, k: number) => (
					<div
						key={k}
						data-testid={`node/text/${attributes.id}/lookup_secret`}
						className='col-xs-3'
					>
						{/* Used lookup_secret has ID 1050014 */}
						<code>{text.id === 1050014 ? 'Used' : text.text}</code>
					</div>
				)
			);
			return (
				<div
					className='container-fluid'
					data-testid={`node/text/${attributes.id}/text`}
				>
					<div className='row'>{secrets}</div>
				</div>
			);
	}

	return (
		<div data-testid={`node/text/${attributes.id}/text`}>
			<code className={clsx('font-light')}> {attributes.text.text} </code>
		</div>
	);
};

const NodeText: FC<Props> = ({ node, attributes }) => {
	return (
		<>
			<p data-testid={`node/text/${attributes.id}/label`}>
				{node.meta?.label?.text}
			</p>
			<Content node={node} attributes={attributes} />
		</>
	);
};

export default NodeText;
