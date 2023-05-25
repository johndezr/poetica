import type { NextPage } from "next";
import MarketplaceView from "@/views/marketplace";
import { Nft } from "../src/types/nft";
import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3";
import { getNtfsMatchMockup } from "../utils/nft";

const Marketplace: NextPage = () => {
  const { listNfts, buyNft } = useWeb3();
  const [nfts, setNfts] = useState<Nft[]>([]);
  useEffect(() => {
    (async () => {
      const nfts = await listNfts();
      const matchedNtfsArr = getNtfsMatchMockup(nfts);
      setNfts(matchedNtfsArr);
    })();
  }, [listNfts]);

  return <MarketplaceView buyNft={buyNft} nfts={nfts} />;
};

export default Marketplace;
