import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { server } from './server';
import { dataSource } from './data-source';
import { Container } from './entitites/Container';
import { Collection } from './entitites/Collection';
import { seedContainers } from './seed/containers';

dotenv.config();
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
const PORT = process.env.PORT || 8000;

dataSource
  .initialize()
  .then(async () => {
    console.log('Database initialized.');
    // dataSource.getRepository(Recipient).find({relations: {}})
    // dataSource.getRepository(Recipient).find({}).then(console.log);
    // dataSource
    //   .getRepository(Recipient)
    //   .save({
    //     id: 2,
    //     type: 'bottle',
    //     description: 'very old bottle',
    //     imageUrl: 'imageurl',
    //     price: 100,
    //     countryOfOrigin: 'DE',
    //     usagePeriodStart: new Date('1990-01-01'),
    //     usagePeriodEnd: new Date('2000-01-01'),
    //     hasLabel: true,
    //     collection: undefined,
    //   })
    //   .then();
    // dataSource
    //   .getRepository(Recipient)
    //   .save({
    //     id: 3,
    //     type: 'bottle',
    //     description: 'very old bottle',
    //     imageUrl: 'imageurl',
    //     price: 100,
    //     countryOfOrigin: 'DE',
    //     usagePeriodStart: new Date('1990-01-01'),
    //     usagePeriodEnd: new Date('2000-01-01'),
    //     hasLabel: true,
    //     collection: undefined,
    //   })
    //   .then();

    // const recipients = [
    //   {
    //     id: 2,
    //     type: 'bottle',
    //     description: 'very old bottle',
    //     imageUrl: 'imageurl',
    //     price: 100,
    //     countryOfOrigin: 'DE',
    //     usagePeriodStart: new Date('1990-01-01'),
    //     usagePeriodEnd: new Date('2000-01-01'),
    //     hasLabel: true,
    //   },
    //   {
    //     id: 3,
    //     type: 'bottle',
    //     description: 'very old bottle',
    //     imageUrl: 'imageurl',
    //     price: 100,
    //     countryOfOrigin: 'DE',
    //     usagePeriodStart: new Date('1990-01-01'),
    //     usagePeriodEnd: new Date('2000-01-01'),
    //     hasLabel: true,
    //   },
    // ];
    // dataSource
    //   .getRepository(Collection)
    //   .save({
    //     name: 'my collection',
    //     recipients: recipients,
    //   })
    //   .then(console.log);
    // dataSource
    //   .getRepository(Collection)
    //   .find({ relations: { recipients: true } })
    //   .then((c) => console.log(JSON.stringify(c, null, 2)));

    // dataSource.getRepository(Collection).save({
    //   name: 'cascade-collection',
    //   recipients: [
    // {
    //   type: 'bottle',
    //   description: 'very NEW bottle',
    //   imageUrl: 'imageurl',
    //   price: 100,
    //   countryOfOrigin: 'DE',
    //   usagePeriodStart: new Date('1990-01-01'),
    //   usagePeriodEnd: new Date('2000-01-01'),
    //   hasLabel: true,
    // },
    //   ],
    // });
    // await seedContainers();

    server.listen({ host: HOSTNAME, port: PORT }, () => {
      console.log(`Server listening at ${HOSTNAME}:${PORT}`);
    });
  })
  .catch(console.error);
