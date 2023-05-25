import Button from "@mui/material/Button";
import { Nft } from "@/types/nft";
import CardText from "../../components/nftCard/cardText";
import CardImage from "../../components/nftCard/cardImage";
import MainCard from "../../components/nftCard";
import Chip from "@mui/material/Chip";
// TODO: fix css styles here, move to a separate file

type NftCardProps = {
  nft: Nft;
  saleNft: (id: number, price: number) => void;
};

const NftCard = ({ nft, saleNft }: NftCardProps) => {
  const { image, title, description, price, creator, tokenId, isListed } = nft;

  const onSaleNtf = () => {
    saleNft(tokenId, price);
  };

  return (
    <MainCard>
      <CardImage image={image} />
      <CardText
        creator={creator}
        title={title}
        description={description}
        cta={
          <>
            <Button variant="contained" size="small">
              Download image
            </Button>
            {!isListed ? (
              <Button onClick={onSaleNtf} variant="outlined" size="small">
                {!isListed ? "Sale" : "Unsale"}
              </Button>
            ) : (
              <Chip label="On Sale" variant="outlined" />
            )}
          </>
        }
      />
    </MainCard>
  );
};

export default NftCard;
