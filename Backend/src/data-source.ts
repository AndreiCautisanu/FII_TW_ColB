import { DataSource } from 'typeorm';
import { Collection } from './entitites/Collection';
import { Container } from './entitites/Container';
import { User } from './entitites/User';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Container, Collection, User],
  migrations: [],
  subscribers: [],
});

export { dataSource };
