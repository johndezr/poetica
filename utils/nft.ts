import { Nft } from "../src/types/nft";
import nftsArrMockup from "../mockups/nfts.json";

export const getNtfsMatchMockup = (nfts: Nft[]) => {
  const nftsLocalStorage = JSON.parse(localStorage.getItem("nfts") || "[]");
  return nftsLocalStorage
    .map((nft: Nft) => {
      const nftFromWallet = nfts.find(
        (nftw) => nftw.tokenId === Number(nft.id)
      );
      if (nftFromWallet) {
        return {
          ...nft,
          ...{
            tokenId: nftFromWallet?.tokenId,
            price: nftFromWallet?.price,
            isListed: nftFromWallet?.isListed,
            creatorAddress: nftFromWallet?.creator,
          },
        };
      }
    })
    .filter((nft: Nft) => nft);
};

export const saveNftInLocalStorage = (nft: Nft) => {
  const nftsLocalStorage = JSON.parse(localStorage.getItem("nfts") || "[]");
  const nftIndex = nftsLocalStorage.findIndex(
    (nftLocalStorage: Nft) => nftLocalStorage.id === nft.id
  );
  if (nftIndex === -1) {
    nftsLocalStorage.push(nft);
  } else {
    nftsLocalStorage[nftIndex] = nft;
  }
  localStorage.setItem("nfts", JSON.stringify(nftsLocalStorage));
};

export const injectNftsLocalStorage = () => {
  const areNftsInLocalStorage = localStorage.getItem("nfts") || [];
  if (!areNftsInLocalStorage) {
    localStorage.setItem("nfts", JSON.stringify(nftsArrMockup));
  }
};
