const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const LiPage = await ethers.getContractFactory("LiPage");

  const name = "Monad NFTs";
  const symbol = "MonadTestnet";
  const baseURI = "https://plum-solid-ferret-699.mypinata.cloud/ipfs/bafybeihl3ouxmt5tpxj7zn6duw3b7xmdl7stxuigjg6bddyrrxnkklv47i/";
  const royaltyAmount = 500;
  const paymentReceiver = deployer.address;
  const mintFee = ethers.utils.parseEther("0.0001");

  console.log("Deploying LiPage contract...");
  const liPage = await LiPage.deploy(
    deployer.address, 
    name, 
    symbol, 
    baseURI, 
    royaltyAmount, 
    paymentReceiver, 
    mintFee
  );

  console.log("Waiting for deployment to complete...");
  await liPage.deployed();

  console.log("LiPage deployed to:", liPage.address);


}

main().catch((err) => {
  console.error("Deployment failed:", err);
  process.exit(1);
});


// npx hardhat run scripts/deployMintNFTs.js --network MonadChain
