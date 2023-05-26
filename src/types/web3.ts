import { MetaMaskInpageProvider } from "@metamask/providers";
import { providers } from "ethers";
import { NftMarketContract } from "./nftMarketContract";
import { Nft } from "./nft";
import { Transaction } from "./transaction";

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
  isLoading: boolean;
  isWalletConnected: boolean;
  isInstalled: boolean;
  isInitialized: boolean;
};

export type Web3Functions = {
  getOwnListNfts: () => Promise<Nft[]>;
  saleNft: (tokenId: number, value: number) => Promise<void>;
  getBalance: () => Promise<string>;
  getTransactionHistory: () => Promise<Transaction[]>;
  sendPayment: (to: string, ether: number) => Promise<void>;
  createNft: (nftUri: string, price: string, nftMetaInfo: Nft) => Promise<void>;
  buyNft: () => Promise<void>;
  listNfts: () => Promise<Nft[]>;
  initWeb3: () => null;
};

export type Web3State = {
  web3Api: Web3Params;
} & Web3Functions;
