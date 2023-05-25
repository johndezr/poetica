import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    activeLink: {
      fontWeight: 700,
    },
    logo: {
      verticalAlign: "middle",
    },
  };
});

export default useStyles;
