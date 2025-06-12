const { ethers } = require("hardhat");

// Thay đổi address contract đã deploy
const contractAddress = "0x3c335cc233EAAf4Cb450f6a1f65A91dD09820641";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  const LiPage = await ethers.getContractFactory("LiPage");
  const liPage = LiPage.attach(contractAddress);

  const tokenId = 1;
  const maxSupply = 100000;
  const startHour = 7;
  const startMinute = 15;

  const now = new Date();
    now.setUTCHours(startHour);
    now.setUTCMinutes(startMinute);
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);

  const startTimestamp = Math.floor(now.getTime() / 1000); // unix timestamp theo GMT+7
  const duration = 30 * 24 * 60 * 60;

  console.log("Start Timestamp:", startTimestamp);
  console.log("Duration (seconds):", duration);

  const tx = await liPage.setTokenConfig(tokenId, maxSupply, startTimestamp, duration);
  await tx.wait();
  console.log("✔ Token config set successfully.");

  const status = await liPage.getTokenStatus(tokenId);
  console.log(`TokenId ${tokenId} Status:`);
  console.log("- Current Supply:", status.currentSupply.toString());
  console.log("- Max Supply:", status.maxSupplyForToken.toString());
  console.log("- Unique Minters:", status.uniqueMinters.toString());
  console.log("- Is Active:", status.isActive);
  console.log("- Is Full:", status.isFull);
  console.log("- Status:", status.status);
}

main().catch((err) => {
  console.error("Set token config failed:", err);
  process.exit(1);
});

// npx hardhat run test/MintNFTs/MintNFTs.js --network MonadChain