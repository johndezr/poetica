import { Nft } from "@/types/nft";
import { Stack, Box, Divider, Avatar } from "@mui/material";
import IconChip from "./iconChip";
import useStyles from "./style";

type CardTextProps = Nft & {
  cta: React.ReactNode;
};

const CardText = ({
  title,
  description,
  price,
  daysLeft,
  creator,
  cta,
}: CardTextProps) => {
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
        {price && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconChip
              imgSrc={"icon-ethereum.svg"}
              text={`${price}ETH`}
              width={10}
              height={18}
              textStyles={{
                fontWeight: "400",
                fontSize: "14px",
                marginRight: "10px",
              }}
            />
          </Box>
        )}
        {cta}
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

export default CardText;
