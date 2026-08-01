/**
 * hardhat.config.js — Hardhat Configuration
 *
 * Purpose: Configures the Hardhat development environment for
 * compiling, deploying, and testing Solidity smart contracts.
 *
 * Networks:
 * - hardhat: Local in-memory blockchain for testing
 * - amoy: Polygon Amoy Testnet (as specified in TRD Section 6)
 *
 * Contracts will be added in Phase 8 — Blockchain Module:
 * - CarbonRegistry.sol
 * - CarbonCredit.sol
 * - Marketplace.sol
 */

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    amoy: {
      url: process.env.ALCHEMY_RPC_URL || (process.env.ALCHEMY_API_KEY ? `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` : ""),
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
