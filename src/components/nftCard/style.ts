import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      "& .MuiCardContent-root": {
        padding: theme.spacing(1.5, 1, 0, 1),
      },
    },
    priceAndCtaBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: theme.spacing(0, 1),
    },
    priceChip: {
      marginLeft: theme.spacing(1),
    },
    ownerBox: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1, 1, 1),
    },
    divider: {
      backgroundColor: "hsl(0, 0%, 100%)",
      opacity: 0.7,
      marginBottom: ".6rem",
    },
  };
});

export default useStyles;
