import { Box, CardMedia } from "@mui/material";
import useStyles from "./style";

type CardImageProps = {
  image: string;
};

const CardImage = ({ image }: CardImageProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.cardImage}>
      <CardMedia
        component="img"
        image={image}
        alt="equilibrium"
        className={classes.cardMedia}
      />
    </Box>
  );
};

export default CardImage;
