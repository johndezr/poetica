import { useRouter } from "next/router";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";
import ProfileView from "@/views/profile";
import { useWeb3 } from "@/contexts/Web3";
import { Nft } from "@/types/nft";
import { useState, useEffect } from "react";
import { getNtfsMatchMockup } from "../../utils/nft";

const Profile = ({ user }: { user: UserValues }) => {
  const { query, isReady, push } = useRouter();
  const { id } = query;
  const {
    web3Api: { isWalletConnected },
    getOwnListNfts,
    saleNft,
  } = useWeb3();
  const [nfts, setNfts] = useState<Nft[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const nfts = await getOwnListNfts();
      console.log(nfts);
      const matchedNtfsArr = getNtfsMatchMockup(nfts);
      setNfts(matchedNtfsArr);
    })();
  }, [getOwnListNfts]);

  if (!isReady) {
    return <></>;
  }

  if (!id) {
    push("/login");
  }

  return !isWalletConnected ? (
    <div>
      <h1>Connect your wallet</h1>
    </div>
  ) : (
    <ProfileView
      isWalletConnected={isWalletConnected}
      user={user}
      nfts={nfts}
      saleNft={saleNft}
    ></ProfileView>
  );
};

export default withUserContext(Profile);
