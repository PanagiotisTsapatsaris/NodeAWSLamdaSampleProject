import { logBody } from '@libs/middlewares';
import middy from '@middy/core';
import _dynamoDB from '@dynamoDB';

const getAuctions = async () => {
	const dynamoDB = await _dynamoDB;
	const auctions = await dynamoDB.getAllAuctions();
	return {
		statusCode: 200,
		body: JSON.stringify({
			auctions
		})
	};
};

export const main = middy(getAuctions).use(logBody());
