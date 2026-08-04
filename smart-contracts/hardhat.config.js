/**
 * hardhat.config.js — Hardhat Configuration
 */

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun",
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {},
    amoy: {
      url: process.env.ALCHEMY_RPC_URL || (process.env.ALCHEMY_API_KEY ? `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` : ""),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002,
      gasPrice: 25000000000, // 25 Gwei to optimize deploy cost on Amoy testnet
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
