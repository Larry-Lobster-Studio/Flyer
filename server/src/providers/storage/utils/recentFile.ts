import fs from 'fs';
import path from 'path';

function getMostRecentFile(dir: string) {
	const files = orderRecentFiles(dir);

	return files.length ? files[0] : undefined;
}

function orderRecentFiles(dir: string) {
	return fs
		.readdirSync(dir)
		.filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
		.map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
		.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
}

export { getMostRecentFile, orderRecentFiles };
