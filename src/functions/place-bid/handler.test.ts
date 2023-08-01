
import { main as handler } from './handler';
import AWSLambda from 'aws-lambda';
import _dynamo from '@dynamoDB';
import { baseTestEventGenerator, baseTestAuction } from '@libs/constants/testConstants';

describe('Testing place-bid function', () => {
	const testEventWithIdAndAmount = baseTestEventGenerator();
	testEventWithIdAndAmount.pathParameters = {
		id: 'sample-id'
	};
	testEventWithIdAndAmount.body = JSON.stringify({
		amount: 10
	});
	let ctx: AWSLambda.Context;

	it('when auction does not exist return 404 ', async () => {
		const testEvent = Object.create(testEventWithIdAndAmount);
		const dynamo = await _dynamo;
		const getAuctionByIdSpy = jest.spyOn(dynamo, 'getAuctionById').mockImplementation(async () => undefined);

		const result = await handler(testEvent, ctx);

		expect(getAuctionByIdSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 404
		});
	});

	it('when bid is not enough return 403 ', async () => {
		const testEventWithNotEnoughAmount = baseTestEventGenerator();
		testEventWithNotEnoughAmount.pathParameters = {
			id: 'sample-id'
		};
		testEventWithNotEnoughAmount.body = JSON.stringify({
			amount: baseTestAuction.highestBid.amount - 10
		});
		const dynamo = await _dynamo;
		const getAuctionByIdSpy = jest.spyOn(dynamo, 'getAuctionById').mockImplementation(async () => baseTestAuction);

		const result = await handler(testEventWithNotEnoughAmount, ctx);

		expect(getAuctionByIdSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 403
		});
	});

	it('when placeBid query fails in dynamoDb does not exist return 403 ', async () => {
		const testEvent = baseTestEventGenerator();
		testEvent.pathParameters = {
			id: 'sample-id'
		};
		testEvent.body = JSON.stringify({
			amount: baseTestAuction.highestBid.amount + 10
		});
		const dynamo = await _dynamo;
		const getAuctionByIdSpy = jest.spyOn(dynamo, 'getAuctionById').mockImplementation(async () => baseTestAuction);
		const placeBidSpy = jest.spyOn(dynamo, 'placeBid').mockImplementation(async () => undefined);

		const result = await handler(testEvent, ctx);

		expect(getAuctionByIdSpy).toHaveBeenCalled();
		expect(placeBidSpy).toHaveBeenCalled();
		expect(result).toMatchObject({
			statusCode: 403
		});
	});
});