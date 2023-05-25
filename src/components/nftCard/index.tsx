import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import useStyles from "./style";
import { Nft } from "@/types/nft";
import IconChip from "./iconChip";
import { stringAvatar } from "../../../utils/misc";

type MainCardProps = {
  nft: Nft;
  buyNftFn: () => void;
};

const MainCard = ({ nft, cta }: MainCardProps) => {
  const { classes } = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="green iguana"
        height={350}
        image={nft.image}
      />
      <CardContent sx={{ mx: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {nft.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {nft.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box className={classes.priceAndCtaBox}>
          <IconChip
            className={classes.priceChip}
            imgSrc={"icon-ethereum.svg"}
            text={`${nft.price}ETH`}
            width={10}
            height={18}
          />
          {cta}
        </Box>
      </CardActions>
      {nft.owned && (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: "hsl(0, 0%, 100%)",
              opacity: 0.7,
              marginBottom: ".6rem",
            }}
          />
          <Box className={classes.ownerBox}>
            <Avatar {...stringAvatar(nft.owned)} />
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginLeft: ".5rem" }}
            >
              {nft.owned}
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
};

export default MainCard;
