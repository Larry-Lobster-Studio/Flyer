async function publicBucketPolicy(bucket: string) {
	return {
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Principal: '*',
				Action: 's3:GetObject',
				Resource: [`arn:aws:s3:::${bucket}/*`],
				Condition: {
					StringEquals: {
						's3:ExistingObjectTag/public': 'true',
					},
				},
			},
		],
	};
}

export { publicBucketPolicy };
