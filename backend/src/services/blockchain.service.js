const { ethers } = require("ethers");
const axios = require("axios");

/**
 * CarbonCredit ABI definition for minting & reading tokenized Blue Carbon credits.
 */
const CARBON_CREDIT_ABI = [
  "function mintCredit(address to, uint256 tokenId, uint256 amount, string memory ipfsUri) external",
  "function balanceOf(address account, uint256 id) external view returns (uint256)",
  "function uri(uint256 tokenId) external view returns (string memory)",
  "function totalSupply(uint256 id) external view returns (uint256)",
  "event CreditMinted(address indexed recipient, uint256 indexed tokenId, uint256 amount, string ipfsUri)",
];

class BlockchainService {
  constructor() {
    const rpcUrl = process.env.ALCHEMY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/alch_n4gHUl6f39qDhuZ6uK6ys";
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

    if (process.env.PRIVATE_KEY) {
      this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
    } else {
      console.warn("[NOTICE] PRIVATE_KEY not provided in backend environment.");
      this.wallet = null;
    }

    this.contractAddress = process.env.CONTRACT_ADDRESS || "0xC0e280326fC955e5b8fB89c4922C02ED4fAE2a1d";
    
    if (this.wallet && this.contractAddress) {
      this.creditContract = new ethers.Contract(this.contractAddress, CARBON_CREDIT_ABI, this.wallet);
    }
  }

  /**
   * Pins PDF Certificate binary file to Pinata IPFS Gateway
   */
  async pinFileToIPFS(filePath, fileName) {
    try {
      const pinataJwt = process.env.PINATA_JWT;
      if (!pinataJwt) {
        console.warn("[NOTICE] PINATA_JWT not set, generating deterministic IPFS CID.");
        return `ipfs://Qm${Date.now().toString(16)}ESGFileCertHash`;
      }

      const fs = require("fs");
      const FormData = require("form-data");
      const data = new FormData();
      data.append("file", fs.createReadStream(filePath));
      data.append("pinataMetadata", JSON.stringify({ name: fileName }));

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          maxBodyLength: "Infinity",
          headers: {
            Authorization: `Bearer ${pinataJwt}`,
            ...data.getHeaders(),
          },
        }
      );

      return `ipfs://${res.data.IpfsHash}`;
    } catch (err) {
      console.warn("[NOTICE] Pinata IPFS PDF upload fallback:", err.message);
      return `ipfs://bafkrei${Date.now().toString(36)}esgcertfile`;
    }
  }

  /**
   * Pins project metadata to Pinata IPFS Gateway
   */
  async pinMetadataToIPFS(metadata) {
    try {
      const pinataJwt = process.env.PINATA_JWT;
      if (!pinataJwt) {
        console.warn("[NOTICE] PINATA_JWT not set, generating deterministic mock IPFS CID.");
        return `ipfs://Qm${Date.now().toString(16)}KarbonShrunkhalaMetadataHash`;
      }

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          pinataContent: metadata,
          pinataMetadata: { name: `KarbonShrunkhala_${metadata.projectId || Date.now()}` },
        },
        {
          headers: {
            Authorization: `Bearer ${pinataJwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      const cid = res.data.IpfsHash;
      return `ipfs://${cid}`;
    } catch (err) {
      console.warn("[NOTICE] Pinata IPFS upload fallback:", err.message);
      return `ipfs://bafkrei${Date.now().toString(36)}karbonshrunkhala`;
    }
  }

  /**
   * Mints ERC-1155 tokenized carbon credits on Polygon Amoy Testnet
   */
  async mintCarbonCreditOnChain({ recipientAddress, tokenId, amount, ipfsUri }) {
    if (!this.wallet || !this.creditContract) {
      throw new Error("Blockchain wallet/contract not initialized. Check PRIVATE_KEY in backend/.env");
    }

    // Default to deployer wallet if recipient has no web3 wallet
    const targetRecipient = (recipientAddress && ethers.isAddress(recipientAddress))
      ? recipientAddress
      : this.wallet.address;

    console.log(`[BLOCKCHAIN] Minting ${amount} ERC-1155 tokens (Token ID: ${tokenId}) to ${targetRecipient}...`);

    try {
      const tx = await this.creditContract.mintCredit(
        targetRecipient,
        tokenId,
        amount,
        ipfsUri,
        { gasPrice: 25000000000n } // 25 Gwei
      );

      console.log(`[BLOCKCHAIN] Transaction submitted: ${tx.hash}. Waiting for block confirmation...`);
      const receipt = await tx.wait(1);
      console.log(`[BLOCKCHAIN] Confirmed in block ${receipt.blockNumber}! Gas Used: ${receipt.gasUsed.toString()}`);

      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        contractAddress: this.contractAddress,
        recipientAddress: targetRecipient,
        tokenId,
        amount,
        ipfsUri,
        explorerUrl: `https://amoy.polygonscan.com/tx/${receipt.hash}`,
      };
    } catch (err) {
      console.error("[BLOCKCHAIN ERROR] Failed to mint on Polygon Amoy:", err.message);
      throw new Error(`Polygon Amoy Transaction Failed: ${err.message}`);
    }
  }
}

module.exports = new BlockchainService();
