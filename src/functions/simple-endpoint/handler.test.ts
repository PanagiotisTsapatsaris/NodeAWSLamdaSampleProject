import { main as handler } from './handler';
import AWSLambda, { APIGatewayProxyEvent } from 'aws-lambda';

describe('Testing simple endpoint function', () => {
	const body = JSON.stringify({});
	const event: APIGatewayProxyEvent & { body: object,  rawBody: string} = {
		body,
		headers: {
			'Content-Type': 'application/json'
		}
	} as any;

	let ctx: AWSLambda.Context;
    
	it('should return status 200', async () => {
		const result = await handler(event, ctx);
		expect(result).toMatchObject({
			statusCode: 200
		});
	});
});