export type NftCore = {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean;
  image: string;
};

export type Nft = NftCore & {
  title: string;
  description: string;
  daysLeft: string;
};
