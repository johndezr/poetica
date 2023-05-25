import { Nft } from "@/types/nft";
import { Box, Grid } from "@mui/material";
import { Key } from "react";
import NftCard from "./nftCard";

type ProfileCollectionProps = {
  nfts: Nft[];
  saleNft: (id: number, price: number) => void;
};

const ProfileCollection = ({
  nfts,
  saleNft = { saleNft },
}: ProfileCollectionProps) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {nfts.map((nft: Nft, index: Key) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <NftCard saleNft={saleNft} nft={nft} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileCollection;
