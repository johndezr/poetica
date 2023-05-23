import { Card, Stack, CardMedia, Avatar, Divider } from "@mui/material";
import useStyles from "./style";
import Image from "next/image";
import Button from "@mui/material/Button";
import { Poem } from "@/types/poem";
import Box from "@mui/material/Box";
// TODO: fix css styles here, move to a separate file

type IconChipProps = {
  imgSrc: string;
  text: string;
  width: number;
  height: number;
  textStyles: {
    color: string;
    fontWeight: string;
    fontSize: string;
    opacity?: string;
    marginRight?: string;
  };
};

const IconChip = ({
  imgSrc,
  text,
  textStyles,
  width,
  height,
}: IconChipProps) => {
  return (
    <Stack direction="row" alignItems="center">
      <Image
        src={imgSrc}
        alt={imgSrc}
        width={width}
        height={height}
        style={{
          marginRight: "5px",
        }}
      />
      <p style={textStyles}>{text}</p>
    </Stack>
  );
};

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

const CardText = ({ title, description, price, daysLeft, creator }: Poem) => {
  const { classes } = useStyles();
  return (
    <Stack
      justifyContent="space-between"
      sx={{ height: "220px", padding: "1rem 0" }}
    >
      <h3 className={classes.heading}>{title}</h3>
      <p className={classes.caption}>{description}</p>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          marginBottom: ".6rem",
          marginTop: ".3rem",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconChip
            imgSrc={"icon-ethereum.svg"}
            text={`${price}ETH`}
            width={10}
            height={18}
            textStyles={{
              color: "hsl(178, 100%, 50%)",
              fontWeight: "400",
              fontSize: "14px",
              marginRight: "10px",
            }}
          />
          <Button variant="contained" size="small">
            Buy
          </Button>
        </Box>
        <IconChip
          imgSrc={"icon-clock.svg"}
          text={`${daysLeft} days left`}
          width={20}
          height={20}
          textStyles={{
            opacity: "0.7",
            color: "#fff",
            fontWeight: "400",
            fontSize: "14px",
          }}
        />
      </Stack>

      <Divider
        variant="middle"
        style={{
          backgroundColor: "hsl(0, 0%, 100%)",
          opacity: 0.7,
          marginBottom: ".6rem",
        }}
      />

      <Stack direction="row" alignItems="center">
        <Avatar
          sx={{
            bgcolor: "white",
            width: "30px",
            height: "30px",
            position: "relative",
          }}
        >
          <Avatar
            src="image-avatar.png"
            sx={{
              bgcolor: "white",
              width: "28px",
              height: "28px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          />
        </Avatar>

        <p className={classes.caption} style={{ marginLeft: "10px" }}>
          Creation of <span className={classes.highlight}>{creator}</span>
        </p>
      </Stack>
    </Stack>
  );
};

type NftPoem = {
  poem: Poem;
};

const NftCard = ({ poem }: NftPoem) => {
  const { image, title, description, price, daysLeft, creator } = poem;
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
          daysLeft={daysLeft}
          title={title}
          description={description}
          price={price}
        />
      </Stack>
    </Card>
  );
};

export default NftCard;
