import { main as handler } from './handler';
import AWSLambda, { APIGatewayProxyEvent } from 'aws-lambda';
import _dynamo from '@dynamoDB';

describe('Testing create auction function', () => {
	const body = JSON.stringify({});
	const event: APIGatewayProxyEvent & { body: object,  rawBody: string} = {
		body,
		headers: {
			'Content-Type': 'application/json'
		}
	} as any;

	let ctx: AWSLambda.Context;
    
	it('should create auction and return status 200', async () => {
		const dynamo = await _dynamo;
		const createAuctionSpy = jest.spyOn(dynamo, 'createAuction');
		const result = await handler(event, ctx);
		expect(createAuctionSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 200
		});
	});
});