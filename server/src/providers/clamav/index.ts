import NodeClam from 'clamscan';

const ClamScan = new NodeClam().init({
	removeInfected: true,
	debugMode: true,
	scanRecursively: false,
	clamdscan: {
		host: '127.0.0.1',
		port: 8310,
		timeout: 300000,
		localFallback: false,
		active: true,
	},
	preference: 'clamdscan',
});

export default ClamScan;
export * from './scanFile';
