import middy from '@middy/core';
import _dynamoDB from '@dynamoDB';
import createError from 'http-errors';
import httpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { AuctionStatus } from '@libs/constants/auctionStatus';

const placeBid = async (event) => {
	const { id } = event.pathParameters;
	const { amount } = event.body;
	const dynamoDB = await _dynamoDB;

	const auction = await dynamoDB.getAuctionById(id);
	if (!auction) {
		throw new createError.NotFound(`Auction with id: ${id} does not exist`);
	}
	if (auction.status == AuctionStatus.Closed) {
		throw new createError.Forbidden('Auction is closed');
	}
	if (auction.highestBid.amount >= amount) {
		throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`);
	}
	const updatedAuction = await dynamoDB.placeBid(id, amount);
	if (!updatedAuction) {
		throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`);
	}
	return {
		statusCode: 200,
		body: JSON.stringify({
			updatedAuction,
			id
		})
	};
};

export const main = middy(placeBid).use(httpJsonBodyParser()).use(httpErrorHandler());
