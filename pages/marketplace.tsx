import type { NextPage } from "next";
import MarketplaceView from "@/views/marketplace";
import { Poem } from "../src/types/poem";
import { useState, useEffect } from "react";
import { useWeb3 } from "@/contexts/Web3";
import { getNtfsMatchMockup } from "../utils/nft";

const Marketplace: NextPage = () => {
  const { listNfts } = useWeb3();
  const [poems, setPoems] = useState<Poem[]>([]);
  useEffect(() => {
    (async () => {
      const nfts = await listNfts();
      const matchedNtfsArr = getNtfsMatchMockup(nfts);
      setPoems(matchedNtfsArr);
    })();
  }, [listNfts]);

  return <MarketplaceView poems={poems} />;
};

export default Marketplace;
