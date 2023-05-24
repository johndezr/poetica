import { CardMedia } from "@mui/material";

type CardImageProps = {
  image: string;
};

const CardImage = ({ image }: CardImageProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt="equilibrium"
        sx={{
          height: "300px",
          width: "100%",
          objectFit: "cover",
          borderRadius: ".2rem",
        }}
      />
    </div>
  );
};

export default CardImage;
