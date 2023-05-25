import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      margin: theme.spacing(10, 10),
    },
    title: {
      fontFamily: "monospace",
      fontWeight: 800,
      letterSpacing: ".2rem",
      color: "inherit",
      textDecoration: "none",
      marginBottom: theme.spacing(5),
    },
    img: {
      borderRadius: theme.spacing(1),
      border: "1px solid #fff",
    },
  };
});

export default useStyles;
