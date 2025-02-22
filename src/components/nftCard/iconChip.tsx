import Image from "next/image";
import { Stack } from "@mui/material";
import useStyles from "./style";

type IconChipProps = {
  imgSrc: string;
  text: string;
  width: number;
  height: number;
  textStyles?: {
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
  const { classes } = useStyles();
  return (
    <Stack direction="row" alignItems="center">
      <Image src={`/${imgSrc}`} alt={imgSrc} width={width} height={height} />
      <p className={classes.priceChip} style={textStyles}>
        {text}
      </p>
    </Stack>
  );
};

export default IconChip;
