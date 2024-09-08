# RudraContract DApp

This project is a decentralized application (DApp) that interacts with the RudraContract smart contract. The DApp allows you to view the owner's name and balance, as well as transfer ethers to the contract owner.

## Description

The RudraContract DApp is built using Hardhat and React. It consists of a smart contract written in Solidity and a React frontend that provides a user-friendly interface to interact with the contract. The smart contract handles the logic for retrieving the owner's name and balance, as well as transferring ethers to the owner. The React frontend displays the owner's information and provides a form to initiate a transfer.

## Getting Started

### Installing

To download the project, you can clone the repository using the following command:

```
git clone https://github.com/Ryder-07/Eth-Proof-Intermediate-Module-2
```

After cloning the repository, navigate to the project's root directory.

### Executing program

To run the DApp, follow these steps:

1. Install the project dependencies by running the following command:

   ```
   npm install
   ```
2. Start a blockchain locally by running the command: 
   ```
   npx hardhat node
   ```

3. Deploy the RudraContract smart contract by running the deployment script:

   ```
   npx hardhat run scripts/deploy.js --network localhost
   ```
4. Go to frontend directory by running the command:

   ```
   cd ./frontend
   ```
5. Install the project dependencies by running the following command:

   ```
   npm install
   ```
6. Start the React development server:

   ```
   npm start
   ```

   The DApp will be accessible in your web browser at `http://localhost:3000`.


Thank you
made with ❤️
