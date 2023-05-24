import type { NextPage } from "next";
import { useWeb3 } from "@/contexts/Web3";

const Home: NextPage = () => {
  const { provider } = useWeb3();

  const getAccounts = async () => {
    const accounts = await provider!.listAccounts();
    console.log(accounts[0]);
  };

  if (provider) {
    getAccounts();
  }
  return <div></div>;
};

export default Home;
