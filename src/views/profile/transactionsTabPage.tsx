import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Transaction } from "@/types/transaction";

const TransactionsTabPage = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Hash</TableCell>
            <TableCell>Nonce</TableCell>
            <TableCell>Block Hash</TableCell>
            <TableCell>Tx Index</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Gas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx: Transaction) => (
            <TableRow
              key={tx.hash}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{tx.timeStamp}</TableCell>
              <TableCell>{tx.hash}</TableCell>
              <TableCell>{tx.nonce}</TableCell>
              <TableCell>{tx.blockHash}</TableCell>
              <TableCell>{tx.transactionIndex}</TableCell>
              <TableCell>{tx.from}</TableCell>
              <TableCell>{tx.to}</TableCell>
              <TableCell>{tx.value}</TableCell>
              <TableCell>{tx.gas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTabPage;
