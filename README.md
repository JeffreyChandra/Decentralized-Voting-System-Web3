# 🗳️ Decentralized Voting System (Web3)

A professional, secure, and transparent voting application built on the Ethereum Blockchain. This project demonstrates a full-stack Web3 integration using Solidity for smart contracts and Next.js for the user interface.

## 🚀 Features

- **Decentralized Voting**: Votes are recorded on the Sepolia Testnet, ensuring immutability.
- **Admin Panel**: Only the contract owner can add candidates via a dedicated dashboard.
- **Anti-Double Voting**: Smart contract logic prevents a single wallet address from voting more than once.
- **Real-time Synchronization**: Frontend updates automatically after transaction confirmation using Wagmi hooks.
- **Responsive UI**: Built with Tailwind CSS for a seamless experience on mobile and desktop.

## 🛠️ Tech Stack

- **Smart Contract**: Solidity, OpenZeppelin (Ownable)
- **Frontend**: Next.js (App Router), TypeScript
- **Blockchain Interface**: Wagmi, Viem, ConnectKit
- **Styling**: Tailwind CSS

## 📋 Prerequisites

Before running this project, ensure you have:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [MetaMask](https://metamask.io/) extension installed.
- Some **Sepolia Testnet ETH** (Get it from a faucet).

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/JeffreyChandra/Decentralized-Voting-System-Web3-.git](https://github.com/JeffreyChandra/Decentralized-Voting-System-Web3-.git)
   cd Decentralized-Voting-System-Web3-

2. **Navigate to Frontend and Install dependencies:**
    ```bash
    cd Frontend/voting-web3
    npm install

3. **Configure Environment Variables:**
    ```bash
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_id_here
    VOTING_CONTRACT_ADDRESS=0xYourContractAddressHere

4. **Run the development server:**
    ```bash
    npm run dev