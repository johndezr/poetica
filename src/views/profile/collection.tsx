import { Poem } from "@/types/poem";
import { Box, Grid } from "@mui/material";
import { Key } from "react";
import NftCard from "./nftCard";

const ProfileCollection = ({ poems }: { poems: Poem[] }) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {poems.map((poem: Poem, index: Key) => (
          <Grid item xs={1} sm={4} md={4} key={index}>
            <NftCard poem={poem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileCollection;
