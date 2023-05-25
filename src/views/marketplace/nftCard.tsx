import Button from "@mui/material/Button";
import { Nft } from "@/types/nft";
import MainCard from "../../components/nftCard/index";

type NftCardProps = {
  nft: Nft;
  buyNft: (id: number, value: number) => void;
};

const NftCard = ({ nft, buyNft }: NftCardProps) => {
  const { price, tokenId } = nft;

  const buyNftFn = () => {
    buyNft(tokenId, Number(price));
  };

  const buttonCta = () => {
    return (
      <Button onClick={buyNftFn} variant="outlined">
        Buy NFT
      </Button>
    );
  };

  return <MainCard nft={nft} cta={buttonCta()}></MainCard>;
};

export default NftCard;
