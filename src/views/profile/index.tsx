import { Nft } from "@/types/nft";
import ProfileCollection from "./collection";
import ProfileTabView from "./profile";
import BasicTabs from "./tabs";
import { UserValues } from "@/types/user";

type ProfileViewProps = {
  nfts: Nft[];
  user: UserValues;
  isWalletConnected: boolean;
  saleNft: (id: number, price: number) => void;
};

const ProfileView = ({
  nfts,
  user,
  isWalletConnected,
  saleNft,
}: ProfileViewProps) => {
  return (
    <>
      <BasicTabs>
        <ProfileCollection saleNft={saleNft} nfts={nfts} />
        <ProfileTabView user={user} isWalletConnected={isWalletConnected} />
      </BasicTabs>
    </>
  );
};

export default ProfileView;
