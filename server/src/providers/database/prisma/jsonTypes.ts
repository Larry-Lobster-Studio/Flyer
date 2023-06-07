import type { DineroSnapshot } from 'dinero.js';

export {};

declare global {
	namespace PrismaJson {
		type DineroType = DineroSnapshot<number>;
	}
}
