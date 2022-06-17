import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { server } from './server';
import { dataSource } from './data-source';
import { seedContainers } from './seed/containers';
import { seedCollections } from './seed/collections';

dotenv.config();
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 8000;

dataSource
	.initialize()
	.then(async () => {
		console.log('Database initialized.');
		// await seedContainers();
		// await seedCollections();

		server.listen({ host: HOSTNAME, port: PORT }, () => {
			console.log(`Server listening at ${HOSTNAME}:${PORT}`);
		});
	})
	.catch(console.error);
