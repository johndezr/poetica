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
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(0.5),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 600,
    },
    ownerBox: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1, 1, 1),
    },
  };
});

export default useStyles;
