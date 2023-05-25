import Image from "next/image";
import { Stack } from "@mui/material";

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
        src={`/${imgSrc}`}
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

export default IconChip;
