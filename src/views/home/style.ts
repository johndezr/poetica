import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      [theme.breakpoints.up("sm")]: {
        margin: theme.spacing(10, 10),
      },
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
    title: {
      fontFamily: "monospace",
      fontWeight: 800,
      letterSpacing: ".2rem",
      color: "inherit",
      textDecoration: "none",
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(6),
        marginBottom: theme.spacing(2.5),
        marginTop: theme.spacing(2.5),
      },
    },
    img: {
      borderRadius: theme.spacing(1),
      border: "1px solid #fff",
    },
  };
});

export default useStyles;
