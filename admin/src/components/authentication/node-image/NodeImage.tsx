import type { FC } from 'react';
import type { UiNode, UiNodeImageAttributes } from '@ory/client';

interface Props {
	node: UiNode;
	attributes: UiNodeImageAttributes;
}

const NodeImage: FC<Props> = ({ node, attributes }) => {
	return (
		<img
			data-testid={`node/image/${attributes.id}`}
			src={attributes.src}
			alt={node.meta.label?.text}
		/>
	);
};

export default NodeImage;
