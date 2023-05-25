export type Transaction = {
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
};
