import React from "react";
import Main from "./main/index";
import Header from "./header/index";
import { withUserContext } from "../../src/contexts/UserStorage";
import { UserValues } from "../../src/types/user";
import { useWeb3 } from "@/contexts/Web3";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { injectNftsLocalStorage } from "../../utils/nft";

type LayoutProps = {
  children: React.ReactNode;
  user: UserValues;
  logout: () => void;
};

const Layout: React.FC<LayoutProps> = ({ children, user, logout }) => {
  const { web3Api, initWeb3 } = useWeb3();

  useEffect(() => {
    if (!web3Api.isInitialized) {
      initWeb3();
      injectNftsLocalStorage();
    }
  }, []);

  if (web3Api.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={web3Api.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <Header user={user} logout={logout} />
      <Main>{children}</Main>
    </div>
  );
};

export default withUserContext(Layout);
