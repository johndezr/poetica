import { Card, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Nft } from "@/types/nft";
import CardText from "../../components/nftCard/cardText";
import CardImage from "../../components/nftCard/cardImage";
import MainCard from "../../components/nftCard/index";
// TODO: fix css styles here, move to a separate file

type NftCardProps = {
  nft: Nft;
  buyNft: (id: number, value: number) => void;
};

const NftCard = ({ nft, buyNft }: NftCardProps) => {
  const { image, title, description, price, daysLeft, creator, tokenId } = nft;
  const buyNftFn = () => {
    buyNft(tokenId, Number(price));
  };

  return (
    <MainCard>
      <Stack alignItems="center">
        <CardImage image={image} />
        <CardText
          creator={creator}
          daysLeft={daysLeft}
          title={title}
          description={description}
          price={price}
          cta={
            <Button onClick={buyNftFn} variant="outlined" size="small">
              Buy
            </Button>
          }
        />
      </Stack>
    </MainCard>
  );
};

export default NftCard;
