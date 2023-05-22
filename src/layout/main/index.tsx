import Container from '@mui/material/Container';
import useStyles from './style';

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const { classes } = useStyles()
  return (
    <>
      <main className={classes.content}>
        <Container>{children}</Container>
      </main>
    </>
  )
}

export default Main
