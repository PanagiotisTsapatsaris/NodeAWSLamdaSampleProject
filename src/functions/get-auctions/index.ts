import { handlerPath } from '@libs/common/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'get',
				path: 'getAuctions',

			},
		},
	],
};
