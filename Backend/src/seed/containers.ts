import { dataSource } from '../data-source';
import { Container } from '../entitites/Container';
import { containers } from './data';

async function seedContainers() {
  await dataSource.getRepository(Container).save(containers);
}

export { seedContainers };
