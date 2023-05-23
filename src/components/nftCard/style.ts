import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    heading: {
      fontWeight: 600,
      fontSize: "1.1rem",
      color: "#fff",
      transition: "all 0.5s ease-in-out",
      marginTop: ".1rem",
      marginBottom: ".1rem",

      "&:hover": {
        cursor: "pointer",
        color: "hsl(178, 100%, 50%)",
      },
    },
    caption: {
      opacity: "0.7",
      fontWeight: 300,
      color: "#fff",
    },
    highlight: {
      color: "#fff",
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
