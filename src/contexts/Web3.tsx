import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Web3State } from "../types/web3";
import { Contract, ethers, providers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { NftCore } from "../types/nft";
import { NftMarketContract } from "../types/nftMarketContract";

function createDefaultState(): Web3State {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    isInstalled: false,
    account: null,
    isWalletConnected: false,
  };
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
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

const Web3Context = createContext<Web3State>(createDefaultState());

type Web3ProviderProps = {
  children: React.ReactNode;
};

const Web3Provider: React.FC<Web3ProviderProps> = ({
  children,
}: Web3ProviderProps) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  const getAccounts = async (provider) => {
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    return account;
  };

  // async function connectWallet(ethereum) {
  //   console.log("connectWallet", web3Api);
  //   return await ethereum?.request({
  //     method: "eth_requestAccounts",
  //   });
  // }

  // TODO: refctor this function and getOwnListNfts
  const listNfts = useCallback(async () => {
    const { contract } = web3Api;
    const nfts = [] as NftCore[];
    const coreNfts =
      (await contract?.getAllNftsOnSale()) as unknown as NftCore[];

    for (let i = 0; i < coreNfts?.length; i++) {
      const item = coreNfts[i];
      const tokenURI = await contract!.tokenURI(item.tokenId);

      nfts.push({
        price: parseFloat(ethers.utils.formatEther(item.price)),
        tokenId: item.tokenId.toNumber(),
        creator: item.creator,
        isListed: item.isListed,
        image: tokenURI,
      });
    }
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

  const getOwnListNfts = useCallback(async () => {
    const { contract } = web3Api;
    const nfts = [] as NftCore[];
    const coreNfts = (await contract?.getOwnedNfts()) as unknown as NftCore[];

    for (let i = 0; i < coreNfts?.length; i++) {
      const item = coreNfts[i];
      const tokenURI = await contract!.tokenURI(item.tokenId);

      nfts.push({
        price: parseFloat(ethers.utils.formatEther(item.price)),
        tokenId: item.tokenId.toNumber(),
        creator: item.creator,
        isListed: item.isListed,
        image: tokenURI,
      });
    }
    return nfts;
  }, [web3Api]);

  const initWeb3 = async () => {
    await checkMetamaskProvider();
    try {
      const ethereum = window.ethereum;
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      const contract = await loadContract("NftMarket", provider);
      const account = await getAccounts(provider);
      const nfts = await listNfts();

      console.log("nfts", nfts);

      setWeb3Api({
        ethereum,
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
