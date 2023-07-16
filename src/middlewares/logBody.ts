import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const logBody = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
	const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
		console.log('Logging event.....');
		console.log(event);
	};

	return {
		before
	};
};
