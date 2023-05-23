import React from "react";
import Main from "./main/index";
import Header from "./header/index";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";

type LayoutProps = {
  children: React.ReactNode;
  user: UserValues;
  logout: () => void;
};

const Layout: React.FC<LayoutProps> = ({ children, user, logout }) => {
  return (
    <div>
      <Header user={user} logout={logout} />
      <Main>{children}</Main>
    </div>
  );
};

export default withUserContext(Layout);
