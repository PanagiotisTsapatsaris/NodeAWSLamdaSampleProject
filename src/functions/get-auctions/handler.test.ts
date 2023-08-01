
import { main as handler } from './handler';
import AWSLambda from 'aws-lambda';
import _dynamo from '@dynamoDB';
import { baseTestEventGenerator } from '@libs/constants/testConstants';

describe('Testing get-auctions function', () => {
	let ctx: AWSLambda.Context;

	it('return auctions and status 200', async () => {
		const testEvent = baseTestEventGenerator();
		const dynamo = await _dynamo;
		const getAuctionsSpy = jest.spyOn(dynamo, 'getAllAuctions');

		const result = await handler(testEvent, ctx);

		expect(getAuctionsSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 200
		});
	});
});