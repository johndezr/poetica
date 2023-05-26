import type { NextPage } from "next";
import MarketplaceView from "@/views/marketplace";
import { Nft } from "../src/types/nft";
import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3";
import { getNtfsMatchMockup } from "../utils/nft";

const Marketplace: NextPage = () => {
  const { listNfts, buyNft, web3Api } = useWeb3();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [areNftsAvaliable, setAreNftsAvaliable] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      const nfts = await listNfts();
      nfts.length > 0 ? setAreNftsAvaliable(true) : setAreNftsAvaliable(false);
      const matchedNtfsArr = getNtfsMatchMockup(nfts);
      setNfts(matchedNtfsArr);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Api]);

  return (
    <MarketplaceView
      areNftsAvaliable={areNftsAvaliable}
      account={web3Api.account as string}
      buyNft={buyNft}
      nfts={nfts}
    />
  );
};

export default Marketplace;
