import _dynamo from '@dynamoDB';

const processAuctions = async () => {
	console.log('Processing Auction');
	const dynamo = await _dynamo;
	const endedAuctions = await dynamo.getEndedAuctions();
	const closePromises = endedAuctions.map((auctionToClose) => dynamo.closeAuctionById(auctionToClose.id));
	await Promise.all(closePromises);
};

export const main = processAuctions;
