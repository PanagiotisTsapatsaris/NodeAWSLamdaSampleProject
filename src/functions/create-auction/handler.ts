import { logBody } from '@middlewares';
import { v4 as uuid } from 'uuid';
import middy from '@middy/core';
import _dynamoDB from '@dynamoDB';

const createAuction = async () => {
	const newAuctionId = uuid();
	const dynamoDB = await _dynamoDB;
	await dynamoDB.createAuction({ id: newAuctionId});
	return {
		statusCode: 200,
		body: JSON.stringify({
			newAuctionId
		})
	};
};

export const main = middy(createAuction).use(logBody());
