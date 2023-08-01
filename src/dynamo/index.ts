import AWS from 'aws-sdk';
import { TableNames } from './constants';
import { Auction } from '@libs/models/Auction';
import { AuctionStatus } from '@libs/constants/auctionStatus';

const initialize = async () => {
	const dynamoDB = new AWS.DynamoDB.DocumentClient();
	return {
		createAuction: async (auction: Auction) => {
			const result = await dynamoDB.put({
				TableName: TableNames.AuctionsTableNames,
				Item: auction
			}).promise();
			return result.Attributes;
		},
		getAllAuctions: async () => {
			const scanResult = await dynamoDB.scan({ TableName: TableNames.AuctionsTableNames }).promise();
			return scanResult.Items;
		},
		getAuctionById: async (id: string): Promise<Auction> => {
			const getResult = await dynamoDB.get({
				TableName: TableNames.AuctionsTableNames,
				Key: {id}}).promise();
			return getResult?.Item as Auction;
		},
		placeBid: async (id: string, bid: number) => {
			const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
				TableName: TableNames.AuctionsTableNames,
				Key: { id },
				UpdateExpression: 'set highestBid.amount = :amount',
				ReturnValues: 'ALL_NEW',
				ConditionExpression: 'highestBid.amount < :amount and AND #status = :status',
				ExpressionAttributeValues: {
					':amount': bid,
					':status': AuctionStatus.Open
				},
				ExpressionAttributeNames: {
					'#status': 'status'
				},
			};
			const result = await dynamoDB.update(params).promise();
			return result?.Attributes;
		},
		getEndedAuctions: async () => {
			const now = new Date();
			const params: AWS.DynamoDB.DocumentClient.QueryInput = {
				TableName: TableNames.AuctionsTableNames,
				IndexName: 'statusAndEndDate',
				KeyConditionExpression: '#status = :status AND endingAt <= :now',
				ExpressionAttributeValues: {
					':status': AuctionStatus.Open,
					':now': now.toISOString()
				},
				ExpressionAttributeNames: {
					 '#status': 'status'
				}
			};
			const result = await dynamoDB.query(params).promise();
			return result.Items;
		},
		closeAuctionById: async (id: string) => {
			const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
				TableName: TableNames.AuctionsTableNames,
				Key: { id },
				UpdateExpression: 'set #status = :status',
				ExpressionAttributeValues: {
					':status': AuctionStatus.Closed
				},
				ExpressionAttributeNames: {
					'#status': 'status'
				}
			};

			return await dynamoDB.update(params).promise();

		}
	};
};

export default initialize();
