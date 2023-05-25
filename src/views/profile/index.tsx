import { Poem } from "@/types/poem";
import ProfileCollection from "./collection";
import ProfileTabView from "./profile";
import BasicTabs from "./tabs";
import { UserValues } from "@/types/user";

type ProfileViewProps = {
  poems: Poem[];
  user: UserValues;
  isWalletConnected: boolean;
};

const ProfileView = ({ poems, user, isWalletConnected }: ProfileViewProps) => {
  return (
    <>
      <BasicTabs>
        <ProfileCollection poems={poems} />
        <ProfileTabView user={user} isWalletConnected={isWalletConnected} />
      </BasicTabs>
    </>
  );
};

export default ProfileView;
