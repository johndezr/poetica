This is a NFT Marketplace built in [Next.js](https://nextjs.org/)

## Getting Started

First, install the dependencies server:

```bash
npm install
```

Connect to Ganache Network:

Link the file to Ganache (config -> Add Project):

```bash
trufle-config.js
```

Migrate a contract to Ganache, contract can be found in the contracts folder. It's called NftMarket.sol

```bash
truffle migrate
```

Run some tests in your console:

```bash
truffle test
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
