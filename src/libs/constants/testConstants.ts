import { Auction } from '@libs/models/Auction';
import { AuctionStatus } from './auctionStatus';

export const testAuction: Auction = {
	id: 'test-id',
	createdAt: 'now',
	highestBid: {
		amount: 0
	},
	status: AuctionStatus.Open,
	endingAt: 'later'
};

export const baseTestBody = JSON.stringify({});
export const baseTestEventGenerator = (): any => {
	return Object.create({
		body: baseTestBody,
		headers: {
			'Content-Type': 'application/json'
		}
	}) as any;
};
export const baseTestAuctionId = 'id'
export const testAuctionStartingDate = new Date();
const testAuctionEndingDate = new Date();
testAuctionEndingDate.setHours(testAuctionStartingDate.getHours() + 1);

export { testAuctionEndingDate };
export const baseTestAuction = {
	createdAt: testAuctionStartingDate.toISOString(),
	highestBid: {
		amount: 0
	},
	endingAt: testAuctionEndingDate.toISOString(),
	id: baseTestAuctionId,
	status: AuctionStatus.Open
};
