import NftCard from "./nftCard";
import Box from "@mui/material/Box";
import { Nft } from "@/types/nft";
import { Grid } from "@mui/material";
import { Key } from "react";

type MarketplaceProps = {
  nfts: Nft[];
  buyNft: (id: number, value: number) => void;
  account: string;
  areNftsAvaliable: Boolean;
};

const Marketplace = ({
  nfts,
  buyNft,
  account,
  areNftsAvaliable,
}: MarketplaceProps) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {!areNftsAvaliable ? (
          <Box sx={{ ml: 5, mt: 5 }}>
            <h1>No NFTs available</h1>
          </Box>
        ) : (
          nfts.map((nft: Nft, index: Key) => (
            <Grid item xs={1} sm={4} md={4} key={index}>
              <NftCard
                thisNftBelongsToMe={nft.creatorAddress === account}
                buyNft={buyNft}
                nft={nft}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Marketplace;
