import NftCard from "./nftCard";
import Box from "@mui/material/Box";
import { Nft } from "@/types/nft";
import { Grid, Typography } from "@mui/material";
import { Key } from "react";

type MarketplaceProps = {
  nfts: Nft[];
  buyNft: (id: number, value: number) => void;
};

const Marketplace = ({ nfts, buyNft }: MarketplaceProps) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          Amazing Poems
        </Typography>
        <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
          Buy your favorite poem
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {nfts.map((nft: Nft, index: Key) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <NftCard buyNft={buyNft} nft={nft} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Marketplace;
