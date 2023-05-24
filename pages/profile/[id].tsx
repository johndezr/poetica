import { useRouter } from "next/router";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";
import ProfileView from "@/views/profile";
import Poems from "../../mockups/poems.json";

const Profile = ({ user }: { user: UserValues }) => {
  const { query, isReady, push } = useRouter();
  const { id } = query;

  if (!isReady) {
    return <></>;
  }

  if (!id) {
    push("/login");
  }

  return <ProfileView poems={Poems}></ProfileView>;
};

export default withUserContext(Profile);
