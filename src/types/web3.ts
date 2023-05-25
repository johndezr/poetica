import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { NftMarketContract } from "./nftMarketContract";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: NftMarketContract | null;
  account: string | null;
};

export type Web3State = {
  isLoading: boolean;
  isWalletConnected: boolean;
  isInstalled: boolean;
} & Web3Params;
