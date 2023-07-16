import AWS from 'aws-sdk';
import { TableNames } from './constants';
import { Auction } from 'src/models/auctionModel';

const initialize = async () => {
	const dynamoDB = new AWS.DynamoDB.DocumentClient();
	return {    
		createAuction: async (auction: Auction) => {
			await dynamoDB.put({
				TableName: TableNames.AuctionsTableNames,
				Item: auction
			}).promise();
		},
		getAllAuctions: async () => {
			const scanResult = await dynamoDB.scan({ TableName: TableNames.AuctionsTableNames }).promise();
			return scanResult.Items;
		
		}
	};
};

export default initialize();
