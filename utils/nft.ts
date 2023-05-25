import { Poem } from "../src/types/poem";
import poemsArrMockup from "../mockups/poems.json";

export const getNtfsMatchMockup = (nfts: Poem[]) => {
  return poemsArrMockup
    .map((poem) => {
      const nft = nfts.find((nft) => nft.tokenId === Number(poem.id));
      if (nft) {
        return {
          ...poem,
          ...{
            tokenID: nft?.tokenId,
            price: nft?.price,
            isListed: nft?.isListed,
            creatorAddress: nft?.creator,
          },
        };
      }
    })
    .filter((poem) => poem);
};
