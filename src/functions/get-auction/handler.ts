import { logBody } from '@middlewares';
import middy from '@middy/core';
import _dynamoDB from '@dynamoDB';

const getAuction = async (event) => {
	const { id } = event.pathParameters;
	const dynamoDB = await _dynamoDB;
	const auctions = await dynamoDB.getAllAuctions();
	return {
		statusCode: 200,
		body: JSON.stringify({
			auctions,
			id
		})
	};
};

export const main = middy(getAuction).use(logBody());
