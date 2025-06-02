const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying Staking Contract with account: ${deployer.address}`);

  const tokenAddress = "0x452b9D82e7f72fE972Cc3Ca4568c084E7ff3E21b"; // token TTT
  const masterchefV2Address = "0xb7B5B55Ef5449148c3160bA460b8B954dB1E3064"; // Địa chỉ Farm
  const adminAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8";
  const treasuryAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8"; // Cùng admin
  const operatorAddress = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8"; // Cùng admin
  const pid = 1;

  // Deploy contract Staking
  const StakingContract = await ethers.getContractFactory("tabiSwapPool");
  const staking = await StakingContract.deploy(
    tokenAddress,
    masterchefV2Address,
    adminAddress,
    treasuryAddress,
    operatorAddress,
    pid, 
  );

  await staking.deployed();
  console.log(`✅ Staking Contract deployed at: ${staking.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  //   npx hardhat run scripts/deploytestDEXStake.js --network TabiChain