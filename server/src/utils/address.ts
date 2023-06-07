import type { AddressPayloadType } from '@/common/types';

import axios from 'axios';
import logger from './logger';

export async function getAddress(addr: AddressPayloadType) {
	const geo = await getGeo(
		`${addr.line_1}+${addr.city}+${addr.postal_code}+${addr.country}`
	);

	let geoPoint: string[] = [];

	if (geo && geo.geometry && geo.geometry.coordinates) {
		const coordinates = geo.geometry.coordinates as number[];

		geoPoint = [coordinates[1].toString(), coordinates[0].toString()];
	}

	return {
		...addr,
		geo: geoPoint,
	};
}

export async function getGeo(address: string) {
	try {
		const { data, status } = await axios.get('https://photon.komoot.io/api', {
			params: {
				q: `${address}`,
			},
			withCredentials: true,
		});

		if (status !== 200) {
			return null;
		}

		return data.features[0];
	} catch (error) {
		logger.debug(error, 'Error occured!');

		return null;
	}
}
