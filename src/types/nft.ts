export type NftCore = {
  tokenId: number;
  id: number;
  price: number;
  creator: string;
  isListed: boolean;
  image: string;
  owned: string;
};

export type Nft = NftCore & {
  title: string;
  description: string;
};
