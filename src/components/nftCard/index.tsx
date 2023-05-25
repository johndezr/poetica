import { Card, Stack } from "@mui/material";
import useStyles from "./style";

type MainCardProps = {
  children: React.ReactNode;
};

const MainCard = ({ children }: MainCardProps) => {
  const { classes } = useStyles();
  return (
    <Card className={classes.root}>
      <Stack alignItems="center">{children}</Stack>
    </Card>
  );
};

export default MainCard;
