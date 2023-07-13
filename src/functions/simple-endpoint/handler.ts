import { logBody } from '@middlewares';
import middy from '@middy/core';


const simpleEndpoint = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Hello friend, welcome to the exciting Serverless world!',
			event,
		}),
	};
};

export const main = middy(simpleEndpoint).use(logBody());
