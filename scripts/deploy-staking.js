const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Get the contract factory
  const BeraStakingPool = await ethers.getContractFactory("BeraStakingPoolInitializable");
  
  // Deploy the contract
  console.log("Deploying BeraStakingPool...");
  const beraStaking = await BeraStakingPool.deploy();
  await beraStaking.deployed();
  console.log("BeraStakingPool deployed to:", beraStaking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 

// npx hardhat run scripts/deploy-staking.js --network MonadChain