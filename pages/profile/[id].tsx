import { useRouter } from "next/router";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";
import ProfileView from "@/views/profile";
import { useWeb3 } from "@/contexts/Web3";
import { Poem } from "@/types/poem";
import { useState, useEffect } from "react";
import { getNtfsMatchMockup } from "../../utils/nft";

const Profile = ({ user }: { user: UserValues }) => {
  const { query, isReady, push } = useRouter();
  const { id } = query;
  const {
    web3Api: { isWalletConnected },
    getOwnListNfts,
  } = useWeb3();
  const [poems, setPoems] = useState<Poem[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const nfts = await getOwnListNfts();
      const matchedNtfsArr = getNtfsMatchMockup(nfts);
      setPoems(matchedNtfsArr);
    })();
  }, []);

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
      poems={poems}
    ></ProfileView>
  );
};

export default withUserContext(Profile);
