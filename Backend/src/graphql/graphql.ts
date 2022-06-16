import * as fs from 'node:fs';
import { graphql, buildSchema, GraphQLArgs } from 'graphql';
import { In } from 'typeorm';
import { dataSource } from '../data-source';
import { Collection } from '../entitites/Collection';
import { Container } from '../entitites/Container';
import { User } from '../entitites/User';

const schemaString = fs.readFileSync('./src/graphql/schema.gql', 'utf-8');
const schema = buildSchema(schemaString);

const queryRootValue = {
  async container(args, _, context, info) {
    const container = await dataSource.getRepository(Container).findOne({ where: { id: args.id } });
    return container;
  },

  async containers(args, _, context, info) {
    if (args.collectionId) {
      const containersWithinCollection = await dataSource
        .getRepository(Container)
        .createQueryBuilder('container')
        .where('container.collection == :collectionId', { collectionId: args.collectionId })
        .getMany();

      return containersWithinCollection;
    } else {
      const allContainers = await dataSource.getRepository(Container).find();
      return allContainers;
    }
  },

  async containersWithoutCollection() {
    const containersWithoutCollection = await dataSource
      .getRepository(Container)
      .createQueryBuilder('container')
      .where('container.collection IS NULL')
      .getMany();
    return containersWithoutCollection;
  },

  async collection(args, _, context, info) {
    const collection = await dataSource
      .getRepository(Collection)
      .findOne({ where: { id: args.id }, relations: { containers: true } });
    return collection;
  },

  async collections(prevObj, args, context, info) {
    const allCollections = await dataSource
      .getRepository(Collection)
      .find({ relations: { containers: true } });
    return allCollections;
  },

  async user(args, _, context, info) {
    const user = await dataSource.getRepository(User).findOne({ where: { id: args.id } });
    return user;
  },

  async users(args, _, context, info) {
    const allUsers = await dataSource.getRepository(User).find();
    return allUsers;
  },
};

const mutationRootValue = {
  async addContainer(args) {
    const container = await dataSource.getRepository(Container).save(args.input);
    return container;
  },

  async updateContainer(args) {
    const upsertResult = await dataSource
      .getRepository(Container)
      .upsert({ id: parseInt(args.id), ...args.input }, { conflictPaths: ['id'] });

    const containerId = upsertResult.identifiers[0].id;

    const container = await dataSource
      .getRepository(Container)
      .findOne({ where: { id: containerId } });

    return container;
  },

  async deleteContainer(args) {
    const container = await dataSource.getRepository(Container).findOne({ where: { id: args.id } });
    await dataSource.getRepository(Container).delete({ id: args.id });
    return container;
  },

  async addCollection(args) {
    const containers = await dataSource
      .getRepository(Container)
      .find({ where: { id: In(args.input.containers) } });

    const collection = await dataSource.getRepository(Collection).save({
      ...args.input,
      containers,
    });

    return collection;
  },

  async updateCollection(args) {
    // perform the following operations in a transaction
    await dataSource.transaction(async (transactionalEntityManager) => {
      // delete old containers of this collection
      const oldCollection = await transactionalEntityManager
        .getRepository(Collection)
        .findOne({ where: { id: args.id }, relations: { containers: true } });

      for (const container of oldCollection!.containers) {
        await transactionalEntityManager
          .getRepository(Container)
          .update({ id: container.id }, { ...container, collection: null });
      }

      // update collection's fields
      await transactionalEntityManager
        .getRepository(Collection)
        .update({ id: args.id }, { id: args.id, ...args.input, containers: undefined });

      // update collection's containers
      const newContainers = await transactionalEntityManager
        .getRepository(Container)
        .find({ where: { id: In(args.input.containers) } });

      for (const container of newContainers) {
        await transactionalEntityManager
          .getRepository(Container)
          .update({ id: container.id }, { collection: args.id });
      }
    });

    const collection = await dataSource
      .getRepository(Collection)
      .findOne({ where: { id: args.id }, relations: { containers: true } });

    return collection;
  },

  async deleteCollection(args) {
    const collection = await dataSource
      .getRepository(Collection)
      .findOne({ where: { id: args.id }, relations: { containers: true } });

    // perform the following operations in a transaction
    await dataSource.transaction(async (transactionalEntityManager) => {
      // unlink containers from the collection
      if (collection?.containers)
        for (const container of collection!.containers) {
          await transactionalEntityManager
            .getRepository(Container)
            .update({ id: container.id }, { ...container, collection: null });
        }

      await transactionalEntityManager.getRepository(Collection).delete({ id: args.id });
    });

    return collection;
  },
};

const rootValue = {
  ...queryRootValue,
  ...mutationRootValue,
};

const evaluateGraphQLQuery = async (
  query: string,
  variables?: GraphQLArgs['variableValues'],
  context?: { username: string }
) => {
  const data = await graphql({
    schema,
    rootValue,
    source: query,
    variableValues: variables,
    contextValue: context,
  });

  return data;
};

export { evaluateGraphQLQuery };
