import Image from "next/image";
import { Button, Grid, Link, Typography, Box } from "@mui/material";
import useStyles from "./style";

const HomeView = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container spacing={1}>
        <Grid direction="column" justifyContent="center" item xs={12} md={7}>
          <Typography variant="h2" component="h1" className={classes.title}>
            Collect & Sell Your <span>AWESOME</span> Surf NFTs
          </Typography>
          <Box>
            <Link href="/marketplace">
              <Button sx={{ mr: 2 }} variant="contained">
                Go to the Marketplace
              </Button>
            </Link>
            <Link href="/create-asset">
              <Button variant="outlined">Create Asset</Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Image
            className={classes.img}
            width={350}
            height={350}
            alt="home-nft"
            src={"/home-nft.gif"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeView;
