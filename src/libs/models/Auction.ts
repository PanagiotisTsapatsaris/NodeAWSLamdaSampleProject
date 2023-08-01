export type Auction = {
    id: string;
    status: string;
    createdAt: string;
    endingAt: string;
    highestBid: {
        amount: number;
    }
};
