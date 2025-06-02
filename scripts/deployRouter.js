const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); 
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const factory = "0x475251A9411CbD033DD7BB12420D1C9f1f344c49";
  const WA0GIAddress = "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701"; 

  const tabiSwapSwapRouter = await hre.ethers.getContractFactory("tabiSwapChainRouter");
  const router = await tabiSwapSwapRouter.deploy(factory, WA0GIAddress);
  await router.deployed();
  console.log("Router deployed at:", router.address);

  const tabiSwapToken = await hre.ethers.getContractFactory("TabiSwapWorld");
  const token = await tabiSwapToken.deploy(deployer.address);
  await token.deployed();
  console.log("Token deployed at:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run scripts/deployRouter.js --network MonadChain