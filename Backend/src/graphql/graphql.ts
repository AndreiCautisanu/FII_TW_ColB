import { graphql, buildSchema, GraphQLArgs } from 'graphql';
import * as fs from 'node:fs';
import { dataSource } from '../data-source';
import { Collection } from '../entitites/Collection';
import { Container } from '../entitites/Container';

const schemaString = fs.readFileSync('./src/graphql/schema.gql', 'utf-8');
const schema = buildSchema(schemaString);

const rootValue = {
  hello: () => 'Hello world!',

  async container(args, _, context, info) {
    const container = await dataSource.getRepository(Container).findOne({ where: { id: args.id } });
    return container;
  },

  async containers(prevObj, args, context, info) {
    const allContainers = await dataSource.getRepository(Container).find();
    return allContainers;
  },

  async collection(prevObj, args, context, info) {
    const collection = await dataSource
      .getRepository(Collection)
      .findOne({ where: { id: args.id } });
    return collection;
  },

  async collections(prevObj, args, context, info) {
    const allCollections = await dataSource.getRepository(Collection).find();
    return allCollections;
  },
};

const evaluateGraphQLQuery = async (query: string, variables?: GraphQLArgs['variableValues']) => {
  const data = await graphql({ schema, rootValue, source: query, variableValues: variables });
  return data;
};

export { evaluateGraphQLQuery };
