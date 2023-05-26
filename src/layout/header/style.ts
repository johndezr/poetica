import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    activeLink: {
      fontWeight: 700,
    },
    logo: {
      verticalAlign: "middle",
    },
    logoTitle: {
      fontFamily: "monospace",
      fontWeight: 800,
      letterSpacing: ".2rem",
      color: "inherit",
      textDecoration: "none",
      marginBottom: theme.spacing(5),
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        fontSize: theme.spacing(2.5),
        marginBottom: theme.spacing(2.5),
        marginTop: theme.spacing(2.5),
        marginLeft: theme.spacing(1),
      },
    },
  };
});

export default useStyles;
