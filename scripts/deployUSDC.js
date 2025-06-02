const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying USDC contract with account:", deployer.address);

  const USDC = await ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy();

  await usdc.deployed();

  console.log("USDC deployed to:", usdc.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/deployUSDC.js --network TabiChain