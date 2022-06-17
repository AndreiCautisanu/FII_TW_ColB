import * as HTTP from 'node:http';
import * as JWT from 'jsonwebtoken';
import { evaluateGraphQLQuery } from './graphql/graphql';

function attachCORSHeaders(res: HTTP.ServerResponse) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
}

function getUsernameFromToken(
	req: HTTP.IncomingMessage,
	res: HTTP.ServerResponse,
	parsedBody: any
): { username: string | undefined; isSignUpOrSignInMutation: boolean } {
	const token = req.headers?.authorization?.split(' ')[1];
	const isSignUpOrSignInMutation =
		parsedBody.query.includes('signUp') || parsedBody.query.includes('signIn');

	if (!token) {
		if (!isSignUpOrSignInMutation) {
			// user is not signing in/up, return error
			res.statusCode = 401;
			res.setHeader('content-type', 'application/json');
			res.write(JSON.stringify({ error: 'No token provided' }));
			res.end();
		}

		return { username: undefined, isSignUpOrSignInMutation };
	}

	try {
		const jwt = JWT.verify(token!, process.env.JWT_SECRET!, { complete: true });
		const payload = jwt.payload as JWT.JwtPayload;
		return { username: payload!.username, isSignUpOrSignInMutation: false };
	} catch (e: any) {
		res.statusCode = 400;
		res.setHeader('content-type', 'application/json');
		res.write(JSON.stringify({ error: `JWT error: ${e?.message}` }));
		res.end();
		return { username: undefined, isSignUpOrSignInMutation: false };
	}
}

function handleGraphQL(req: HTTP.IncomingMessage, res: HTTP.ServerResponse) {
	let body = '';

	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	req.on('end', async () => {
		const parsedBody = JSON.parse(body);

		const { username, isSignUpOrSignInMutation } = getUsernameFromToken(
			req,
			res,
			parsedBody
		);
		if (username !== undefined || isSignUpOrSignInMutation) {
			const data = await evaluateGraphQLQuery(
				parsedBody.query,
				parsedBody.variables,
				{ username: username! }
			);

			res.statusCode = 200;
			res.setHeader('content-type', 'application/json');
			res.write(JSON.stringify(data));
			res.end();
		}
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
