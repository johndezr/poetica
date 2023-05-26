import { createContext, useContext, useState, useCallback } from "react";
import { Web3State, Web3Functions } from "../types/web3";
import { Contract, ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { NftCore } from "../types/nft";
import { NftMarketContract } from "../types/nftMarketContract";
import { saveNftInLocalStorage } from "../../utils/nft";
import { Nft } from "../types/nft";
import Web3 from "web3";
import { Transaction } from "../types/transaction";

type Web3ProviderProps = {
  children: React.ReactNode;
};

const MIN_BLOCK_NUMBER = 0;
const MAX_BLOCK_NUMBER = 20;
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
const Web3Context = createContext<Web3State>(createDefaultState());

function createDefaultState(): Web3State {
  return {
    web3Api: {
      ethereum: null,
      provider: null,
      contract: null,
      isLoading: true,
      isInstalled: false,
      account: null,
      isWalletConnected: false,
    },
    getOwnListNfts: () => [] as Nft[],
    listNfts: () => [] as Nft[],
    saleNft: () => null,
    getBalance: () => "",
    getTransactionHistory: () => [] as Transaction[],
    sendPayment: () => null,
    createNft: () => null,
    buyNft: () => null,
  };
}

const loadContract = async (
  name: string,
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const truffleJsonContract = await res.json();

  if (truffleJsonContract.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      truffleJsonContract.networks[NETWORK_ID].address,
      truffleJsonContract.abi,
      provider
    );

    const signer = provider.getSigner();
    const signedContract = contract.connect(signer);

    return signedContract;
  } else {
    return Promise.reject(`Contract: [${name}] cannot be loaded!`);
  }
};

const Web3Provider: React.FC<Web3ProviderProps> = ({
  children,
}: Web3ProviderProps) => {
  // TODO: create helper file for divide the functions

  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  const getAccounts = async (provider: providers.Web3Provider) => {
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    return account;
  };

  const handleListNfts = async (coreNfts: NftCore[], contract: Contract) => {
    const nfts = [];
    for (let i = 0; i < coreNfts?.length; i++) {
      const item = coreNfts[i];
      const tokenURI = await contract!.tokenURI(item.tokenId);

      nfts.push({
        price: parseFloat(ethers.utils.formatEther(item.price)),
        tokenId: Number(item.tokenId),
        creator: item.creator,
        isListed: item.isListed,
        image: tokenURI,
      });
    }
    return nfts;
  };

  const listNfts = useCallback(async () => {
    const { contract } = web3Api;
    const coreNfts =
      (await contract?.getAllNftsOnSale()) as unknown as NftCore[];
    const nfts = await handleListNfts(coreNfts, contract);
    return nfts;
  }, [web3Api]);

  const getOwnListNfts = useCallback(async () => {
    const { contract } = web3Api;
    const coreNfts = (await contract?.getOwnedNfts()) as unknown as NftCore[];
    const nfts = await handleListNfts(coreNfts, contract);
    return nfts;
  }, [web3Api]);

  const buyNft = useCallback(
    async (tokenId: number, value: number) => {
      const { contract } = web3Api;
      setWeb3Api((api) => ({ ...api, isLoading: true }));
      try {
        const result = await contract?.buyNft(tokenId, {
          value: ethers.utils.parseEther(value.toString()),
        });
        await result?.wait();
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        alert("You have bought Nft. See profile page.");
      } catch (e: any) {
        console.error(e.message);
      }
    },
    [web3Api]
  );

  const saleNft = useCallback(
    async (tokenId: number, value: number) => {
      const { contract } = web3Api;
      setWeb3Api((api) => ({ ...api, isLoading: true }));
      try {
        const result = await contract?.placeNftOnSale(
          tokenId,
          ethers.utils.parseEther(value.toString()),
          {
            value: ethers.utils.parseEther((0.025).toString()),
          }
        );
        await result?.wait();
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        alert("You have sold Nft. See marketplace.");
      } catch (e: any) {
        console.error(e.message);
      }
    },
    [web3Api]
  );

  const createNft = useCallback(
    async (nftUri: string, price: string, nftMetaInfo: Nft) => {
      const { contract, provider } = web3Api;
      setWeb3Api((api) => ({ ...api, isLoading: true }));
      try {
        const transaction = await contract?.mintToken(
          nftUri,
          ethers.utils.parseEther(price),
          {
            value: ethers.utils.parseEther((0.025).toString()),
          }
        );
        await transaction!.wait();
        await provider?.waitForTransaction(transaction!.hash);
        const receipt = await provider?.getTransactionReceipt(
          transaction!.hash
        );
        const tokenId = parseInt(receipt!.logs[0].topics[3]);
        saveNftInLocalStorage({
          ...nftMetaInfo,
          price: parseFloat(price),
          tokenId,
          id: tokenId,
          creator: web3Api.account,
          isListed: true,
          image: nftUri,
        });
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        alert("You have created Nft. See profile page.");
      } catch (e: any) {
        console.error(e.message);
      }
    },
    [web3Api]
  );

  const getBalance = useCallback(async () => {
    const { provider, account } = web3Api;
    const balance = await provider?.getBalance(account);
    const balanceInEth = ethers.utils.formatEther(balance);
    return balanceInEth;
  }, [web3Api]);

  const getTransactionsByAccount = async (
    myaccount: string | null,
    startBlockNumber: number,
    endBlockNumber: number,
    eth: { getBlock: (arg0: any, arg1: boolean) => any }
  ) => {
    const history = [] as Transaction[];
    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
      const block = await eth.getBlock(i, true);
      if (block != null && block.transactions != null) {
        block.transactions.forEach((tx: Transaction) => {
          if (myaccount == "*" || myaccount == tx.from || myaccount == tx.to) {
            history.push({
              timeStamp: block.timestamp,
              hash: tx.hash,
              nonce: tx.nonce,
              blockHash: tx.blockHash,
              transactionIndex: tx.transactionIndex,
              from: tx.from,
              to: tx.to,
              value: tx.value,
              gas: tx.gas,
              gasPrice: tx.gasPrice,
            });
          }
        });
      }
    }
    return history;
  };

  const getTransactionHistory = useCallback(async () => {
    const { account, web3 } = web3Api;
    const history = getTransactionsByAccount(
      account,
      MIN_BLOCK_NUMBER,
      MAX_BLOCK_NUMBER,
      web3.eth
    );
    return history;
  }, [web3Api]);

  const sendPayment = useCallback(
    async (to: string, ether: number) => {
      const { account, provider } = web3Api;
      const signer = provider.getSigner();
      ethers.utils.getAddress(account);
      setWeb3Api((api) => ({ ...api, isLoading: true }));
      try {
        const transaction = await signer.sendTransaction({
          to,
          value: ethers.utils.parseEther(ether.toString()),
        });
        await transaction.wait();
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        alert("You have sent payment.");
      } catch (e: any) {
        alert(e.message);
      } finally {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
      }
    },
    [web3Api]
  );

  const initWeb3 = async () => {
    await checkMetamaskProvider();
    try {
      const ethereum = window.ethereum;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = await loadContract("NftMarket", provider);
      const account = await getAccounts(provider);
      const web3 = new Web3(window.ethereum as any);

      setWeb3Api({
        ethereum,
        web3,
        provider,
        contract: contract as unknown as NftMarketContract,
        account,
        isWalletConnected: !!account,
        isLoading: false,
        isInstalled: true,
      });
    } catch (error) {
      setWeb3Api((api) => ({
        ...api,
        isLoading: false,
        isInstalled: false,
      }));
    }
  };

  const checkMetamaskProvider = async () => {
    try {
      const providerMetaMask = await detectEthereumProvider();
      if (!providerMetaMask) {
        console.log("Please install MetaMask!");
        return;
      }
    } catch (error) {
      console.log("Please install MetaMask!");
    }
  };

  return (
    <Web3Context.Provider
      value={{
        web3Api,
        initWeb3,
        listNfts,
        getOwnListNfts,
        buyNft,
        saleNft,
        createNft,
        getBalance,
        getTransactionHistory,
        sendPayment,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
