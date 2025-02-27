# Web3 Authentication with MetaMask

This project enables users to authenticate using their MetaMask wallet instead of traditional credentials.

## Features
- Uses Ethereum wallets for authentication.
- Generates a unique nonce for secure login.
- Verifies signatures using ethers.js.

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Compile & Deploy the Smart Contract
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Start Backend
```sh
cd backend
node server.js
```

### 4. Start React Frontend
```sh
cd frontend
npm start
```

## Requirements
- Node.js & npm
- Hardhat
- MetaMask Wallet
- React.js
- Express.js

## License
MIT
