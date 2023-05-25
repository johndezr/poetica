import Button from "@mui/material/Button";
import { Nft } from "@/types/nft";
import MainCard from "../../components/nftCard/index";
import { Chip } from "@mui/material";

type NftCardProps = {
  nft: Nft;
  buyNft: (id: number, value: number) => void;
  thisNftBelongsToMe: boolean;
};

const NftCard = ({ nft, buyNft, thisNftBelongsToMe }: NftCardProps) => {
  const { price, tokenId } = nft;
  const buyNftFn = () => {
    buyNft(tokenId, Number(price));
  };

  const buttonCta = () => {
    return (
      <>
        {thisNftBelongsToMe ? (
          <Chip label="Acquired NFT" variant="outlined" />
        ) : (
          <Button onClick={buyNftFn} variant="outlined">
            Buy NFT
          </Button>
        )}
      </>
    );
  };

  return <MainCard nft={nft} cta={buttonCta()}></MainCard>;
};

export default NftCard;
