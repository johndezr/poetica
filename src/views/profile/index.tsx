import { Nft } from "@/types/nft";
import CollectionTabPage from "./collectionTabPage";
import BasicTabs from "./tabs";
import { UserValues } from "@/types/user";
import { Box } from "@mui/material";
import TransactionsTabPage from "./transactionsTabPage";
import { Transaction } from "@/types/transaction";

type ProfileViewProps = {
  nfts: Nft[];
  user: UserValues;
  isWalletConnected: boolean;
  saleNft: (id: number, price: number) => void;
  balance: number;
  transactions: Transaction[];
};

const ProfileView = ({
  nfts,
  user,
  isWalletConnected,
  saleNft,
  balance,
  transactions,
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
      </BasicTabs>
    </>
  );
};

export default ProfileView;
