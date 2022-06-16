import * as HTTP from 'node:http';
import { evaluateGraphQLQuery } from './graphql/graphql';

function attachCORSHeaders(res: HTTP.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
}

function handleGraphQL(req: HTTP.IncomingMessage, res: HTTP.ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const parsedBody = JSON.parse(body);
    // console.log('🚀  -> file: index.ts  -> line 24  -> body', parsedBody.query);
    const data = await evaluateGraphQLQuery(parsedBody.query, parsedBody.variables);

    res.statusCode = 200;
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
  });
}

function handleInvalidURL(res: HTTP.ServerResponse) {
  res.statusCode = 404;
  res.end();
}

const server = new HTTP.Server((req, res) => {
  attachCORSHeaders(res);

  switch (req.url) {
    case '/graphql':
      handleGraphQL(req, res);
      break;

    default:
      handleInvalidURL(res);
      break;
  }
});

export { server };
