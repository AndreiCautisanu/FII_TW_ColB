import { dataSource } from '../data-source';
import { Collection } from '../entitites/Collection';
import { collections } from './data';

async function seedCollections() {
  await dataSource.getRepository(Collection).save(collections);
}

export { seedCollections };
