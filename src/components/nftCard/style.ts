import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      width: "350px",
      height: "550px",
      borderRadius: theme.spacing(0.5),
      padding: "1rem",
    },
    cardImage: {
      position: "relative",
      width: "100%",
      height: "300px",
    },
    cardMedia: {
      height: "300px",
      width: "100%",
      objectFit: "cover",
      borderRadius: ".2rem",
    },
    heading: {
      fontWeight: 600,
      fontSize: "1.1rem",
      transition: "all 0.5s ease-in-out",
      marginTop: ".1rem",
      marginBottom: ".1rem",

      "&:hover": {
        cursor: "pointer",
        color: "hsl(178, 100%, 50%)",
      },
    },
    caption: {
      fontWeight: 300,
    },
    highlight: {
      fontWeight: 400,
      opacity: 1,
      transition: "all 0.5s ease-in-out",

      "&:hover": {
        cursor: "pointer",
        color: "hsl(178, 100%, 50%)",
      },
    },
  };
});

export default useStyles;
