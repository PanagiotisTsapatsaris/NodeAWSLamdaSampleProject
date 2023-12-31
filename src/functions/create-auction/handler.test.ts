import { main as handler } from './handler';
import AWSLambda from 'aws-lambda';
import _dynamo from '@dynamoDB';
import { baseTestEventGenerator } from '@libs/constants/testConstants';

describe('Testing create auction function', () => {
	let ctx: AWSLambda.Context;

	it('should create auction and return status 200', async () => {
		const testEvent = baseTestEventGenerator();
		const dynamo = await _dynamo;
		const createAuctionSpy = jest.spyOn(dynamo, 'createAuction');

		const result = await handler(testEvent, ctx);

		expect(createAuctionSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 200
		});
	});
});