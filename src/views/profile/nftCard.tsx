import Button from "@mui/material/Button";
import { Nft } from "@/types/nft";
import MainCard from "../../components/nftCard";
import Chip from "@mui/material/Chip";

type NftCardProps = {
  nft: Nft;
  saleNft: (id: number, price: number) => void;
};

const NftCard = ({ nft, saleNft }: NftCardProps) => {
  const { price, tokenId, isListed } = nft;

  const onSaleNtf = () => {
    saleNft(tokenId, price);
  };

  const buttonCta = () => {
    return (
      <>
        <Button variant="contained" size="small">
          Download image
        </Button>
        {!isListed ? (
          <Button onClick={onSaleNtf} variant="outlined">
            {!isListed ? "Sale" : "Unsale"}
          </Button>
        ) : (
          <Chip label="On Sale" variant="outlined" />
        )}
      </>
    );
  };

  return <MainCard nft={nft} cta={buttonCta}></MainCard>;
};

export default NftCard;
