
import { main as handler } from './handler';
import AWSLambda from 'aws-lambda';
import _dynamo from '@dynamoDB';
import { baseTestAuction } from '@libs/constants/testConstants';
import { baseTestEventGenerator } from '@libs/constants/testConstants';
describe('Testing get auction function', () => {
	let ctx: AWSLambda.Context;

	it('when auction exists should return it and return status 200', async () => {
		const testEventWithId = baseTestEventGenerator();
		testEventWithId.pathParameters = {
			id: baseTestAuction.id
		};

		const dynamo = await _dynamo;
		const getAuctionSpy = jest.spyOn(dynamo, 'getAuctionById').mockImplementation(async () => baseTestAuction);

		const result = await handler(testEventWithId, ctx);

		expect(getAuctionSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 200
		});
	});

	it('when auction does not exist return status 404', async () => {
		const testEventWithId = baseTestEventGenerator();
		testEventWithId.pathParameters = {
			id: baseTestAuction.id
		};

		const dynamo = await _dynamo;
		const getAuctionSpy = jest.spyOn(dynamo, 'getAuctionById').mockImplementation(async () => {
			return undefined;
		});

		const result = await handler(testEventWithId, ctx);

		expect(getAuctionSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 404
		});
	});
});