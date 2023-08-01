import { logBody } from '@libs/middlewares';
import { v4 as uuid } from 'uuid';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { AuctionStatus } from '../../libs/constants/auctionStatus';
import _dynamoDB from '@dynamoDB';

const createAuction = async () => {
	const newAuctionId = uuid();
	const now = new Date();
	const endDate = new Date();
	endDate.setHours(now.getHours() + 1);

	const dynamoDB = await _dynamoDB;

	const newAuction = await dynamoDB.createAuction({
		id: newAuctionId,
		status: AuctionStatus.Open,
		createdAt: now.toISOString(),
		endingAt: endDate.toISOString(),
		highestBid: {
			amount: 0
		}
	});
	return {
		statusCode: 200,
		body: JSON.stringify({
			newAuction
		})
	};
};

export const main = middy(createAuction).use(logBody()).use(httpJsonBodyParser());
