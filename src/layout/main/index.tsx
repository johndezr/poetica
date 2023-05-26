import Container from "@mui/material/Container";

type MainProps = {
  children: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Main;
