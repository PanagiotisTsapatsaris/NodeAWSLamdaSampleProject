import { handlerPath } from '@libs/common/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'post',
				path: 'createAuction',

			},
		},
	],
};
