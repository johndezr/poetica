import { Nft } from "@/types/nft";
import CollectionTabPage from "./collectionTabPage";
import BasicTabs from "./tabs";
import { UserValues } from "@/types/user";
import { Box } from "@mui/material";
import TransactionsTabPage from "./transactionsTabPage";
import { Transaction } from "@/types/transaction";
import SendEthTabPage from "./sendEthTabPage";

type ProfileViewProps = {
  nfts: Nft[];
  user: UserValues;
  transactions: Transaction[];
  isWalletConnected: boolean;
  balance: number | string;
  saleNft: (id: number, price: number) => void;
  sendPayment: (to: string, ether: number) => void;
};

const ProfileView = ({
  nfts,
  user,
  isWalletConnected,
  saleNft,
  balance,
  transactions,
  sendPayment,
}: ProfileViewProps) => {
  return (
    <>
      <BasicTabs>
        <CollectionTabPage saleNft={saleNft} nfts={nfts} />
        <Box>
          <>
            {isWalletConnected ? (
              <h2>Wallet Address: {user?.wallet.address}</h2>
            ) : (
              <p>Connect your wallet</p>
            )}
          </>
        </Box>
        <Box>
          <h2>Balance: {balance} - ETH</h2>
        </Box>
        <TransactionsTabPage transactions={transactions} />
        <SendEthTabPage sendPayment={sendPayment} />
      </BasicTabs>
    </>
  );
};

export default ProfileView;
