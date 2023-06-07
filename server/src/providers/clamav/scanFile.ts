import fs from 'fs';

import ClamScan from '.';

export async function scanFile(filePath: string) {
	return ClamScan.then(async (clamscan) => {
		try {
			const version = await clamscan.getVersion();
			console.log(`ClamAV Version: ${version}`);
			const { isInfected, file, viruses } = await clamscan.scanFile(filePath);

			if (isInfected) {
				fs.unlinkSync(filePath);
				console.log(`File is infected with ${viruses}!`);
			}

			return {
				isInfected,
				viruses,
				file,
			};
		} catch (error) {
			console.log('error clamscan: ', error);
			throw new Error('Something went wrong scanning the file for viruses');
		}
	});
}
