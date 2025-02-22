import { useRouter } from "next/router";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";
import ProfileView from "@/views/profile";
import { useWeb3 } from "@/contexts/Web3";
import { Nft } from "@/types/nft";
import { useState, useEffect } from "react";
import { getNtfsMatchMockup } from "../../utils/nft";
import { Transaction } from "../../src/types/transaction";

const Profile = ({ user }: { user: UserValues }) => {
  const { query, isReady, push } = useRouter();
  const { id } = query;
  const {
    web3Api: { isWalletConnected },
    getOwnListNfts,
    saleNft,
    getBalance,
    getTransactionHistory,
    sendPayment,
  } = useWeb3();
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [balance, setBalance] = useState<string | number>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async () => {
      if (isWalletConnected) {
        const nfts = await getOwnListNfts();
        const matchedNtfsArr = getNtfsMatchMockup(nfts ? nfts : []);
        const walletBalance = await getBalance();
        const transactionHistory = await getTransactionHistory();

        setNfts(matchedNtfsArr);
        setBalance(walletBalance);
        setTransactions(transactionHistory);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      saleNft={saleNft}
      nfts={nfts}
      balance={balance as number}
      transactions={transactions}
      sendPayment={sendPayment}
    ></ProfileView>
  );
};

export default withUserContext(Profile);
