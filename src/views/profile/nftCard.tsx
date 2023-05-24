import { Card, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Poem } from "@/types/poem";
import CardText from "../../components/nftCard/cardText";
import CardImage from "../../components/nftCard/cardImage";
// TODO: fix css styles here, move to a separate file

type NftPoem = {
  poem: Poem;
};

const NftCard = ({ poem }: NftPoem) => {
  const { image, title, description, price, creator } = poem;
  return (
    <Card
      sx={{
        bgcolor: "hsl(216, 50%, 16%)",
        width: "350px",
        height: "550px",
        borderRadius: "1rem",
        padding: "1rem",
      }}
    >
      <Stack alignItems="center">
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
              <Button variant="contained" size="small">
                Tranfer
              </Button>
            </>
          }
        />
      </Stack>
    </Card>
  );
};

export default NftCard;
