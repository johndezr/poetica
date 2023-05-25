import { Nft } from "@/types/nft";
import { Box, Grid, Button } from "@mui/material";
import { Key } from "react";
import NftCard from "./nftCard";
import Link from "next/link";

type ProfileCollectionProps = {
  nfts: Nft[];
  saleNft: (id: number, price: number) => void;
};

const CollectionTabPage = ({
  nfts,
  saleNft = { saleNft },
}: ProfileCollectionProps) => {
  return (
    <Box>
      {nfts.length === 0 && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <h1>There are no NFTs in your collection</h1>
          <Link href="/marketplace">
            <Button variant="contained">Go to the Marketplace</Button>
          </Link>
        </Box>
      )}
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

export default CollectionTabPage;
