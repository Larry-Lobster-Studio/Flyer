import { config } from '@/config/main.config';
import { oryAdmin } from '@/providers/authentication';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
	const { data, status } = await oryAdmin.createIdentity({
		createIdentityBody: {
			schema_id: 'default',
			traits: {
				email: 'bram.logghe@test.com',
				name: {
					first: 'Bram',
					last: 'Logghe',
				},
			},
		},
	});

	const countComp = await prisma.company.count();

	if (status === 201) {
		await prisma.user.create({
			data: {
				id: data.id,
				email: data.traits.email,
				first_name: data.traits.name.first,
				last_name: data.traits.name.last,
				company: {
					create: {
						id: `comp_${nanoid(21)}`,
						name: config.company,
						settings: {
							create: {},
						},
					},
				},
			},
		});
	} else if (status === 409 && countComp === 0) {
		const admin = await prisma.user.findFirst();

		await prisma.company.create({
			data: {
				id: `comp_${nanoid(21)}`,
				name: config.company,
				users: {
					connect: {
						id: admin?.id,
					},
				},
				settings: {
					create: {},
				},
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
