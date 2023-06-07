import type { FC } from 'react';
import type { UiNode, UiNodeAnchorAttributes } from '@ory/client';

import Link from 'next/link';

interface Props {
	node: UiNode;
	attributes: UiNodeAnchorAttributes;
}

const NodeAnchor: FC<Props> = ({ node, attributes }) => {
	return (
		<Link data-testid={`node/anchor/${attributes.id}`} href={attributes.href}>
			{attributes.title.text}
		</Link>
	);
};

export default NodeAnchor;
