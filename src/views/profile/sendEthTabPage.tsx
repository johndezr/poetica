import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const SendEthTabPage = ({
  sendPayment,
}: {
  sendPayment: (to: string, ether: number) => void;
}) => {
  const onClickPayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const to = data.get("to");
    const ether = data.get("amount");
    sendPayment(to, ether);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CurrencyExchangeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send ETH Payment
        </Typography>
        <Box component="form" onSubmit={onClickPayment} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="to"
            label="Receiver Address"
            name="to"
            autoComplete="to"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount in ETH"
            type="number"
            id="amount"
            autoComplete="amount"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SendEthTabPage;
