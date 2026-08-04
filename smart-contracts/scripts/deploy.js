const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("==========================================");
  console.log("KarbonShrunkhala Smart Contract Deployment");
  console.log("==========================================");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer Wallet Address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer POL Balance:", ethers.formatEther(balance));

  // 1. Deploy CarbonCredit.sol
  console.log("\nDeploying CarbonCredit.sol...");
  const CarbonCreditFactory = await ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCreditFactory.deploy(deployer.address);
  await carbonCredit.waitForDeployment();
  const carbonCreditAddress = await carbonCredit.getAddress();
  console.log("✅ CarbonCredit Deployed to:", carbonCreditAddress);

  // 2. Deploy CarbonRegistry.sol
  console.log("\nDeploying CarbonRegistry.sol...");
  const CarbonRegistryFactory = await ethers.getContractFactory("CarbonRegistry");
  const carbonRegistry = await CarbonRegistryFactory.deploy(deployer.address);
  await carbonRegistry.waitForDeployment();
  const carbonRegistryAddress = await carbonRegistry.getAddress();
  console.log("✅ CarbonRegistry Deployed to:", carbonRegistryAddress);

  console.log("\n==========================================");
  console.log("Deployment Successful!");
  console.log("CarbonCredit Address:", carbonCreditAddress);
  console.log("CarbonRegistry Address:", carbonRegistryAddress);
  console.log("==========================================");

  // Save addresses to JSON output
  const deploymentInfo = {
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    carbonCreditAddress,
    carbonRegistryAddress,
    deployedAt: new Date().toISOString(),
  };

  const outputPath = path.join(__dirname, "../deployment-info.json");
  fs.writeFileSync(outputPath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Saved deployment output to: ${outputPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
