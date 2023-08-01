import { logBody } from '@libs/middlewares';
import middy from '@middy/core';
import _dynamoDB from '@dynamoDB';
import createError from 'http-errors';
import httpErrorHandler from '@middy/http-error-handler';

const getAuction = async (event) => {
	const { id } = event.pathParameters;
	const dynamoDB = await _dynamoDB;
	const auction = await dynamoDB.getAuctionById(id);
	if (!auction) {
		throw new createError.NotFound(`Auction with id:"${id}" not found`);
	}
	return {
		statusCode: 200,
		body: JSON.stringify({
			auction,
			id
		})
	};
};

export const main = middy(getAuction).use(logBody()).use(httpErrorHandler());
