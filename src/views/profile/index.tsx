import { Poem } from "@/types/poem";
import ProfileCollection from "./collection";
import BasicTabs from "./tabs";

const ProfileView = ({ poems }: { poems: Poem[] }) => {
  return (
    <>
      <BasicTabs>
        <ProfileCollection poems={poems} />
      </BasicTabs>
    </>
  );
};

export default ProfileView;
