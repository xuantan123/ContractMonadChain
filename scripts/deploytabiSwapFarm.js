const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying tabiSwapFarm contract...");

    const tabiSwapFarm = await ethers.getContractFactory("tabiSwapFarm");

    const CAKE_ADDRESS = "0xf7E259629aFC7A1739C306D48B7Aee32b805A0dd"; //TTT (token)

    const BURN_ADMIN_ADDRESS = "0xD883d78895ea55071a4B9e9583A1a13e09b07DA8";  //wallet address admin

    const TabiSwapFarm = await tabiSwapFarm.deploy(CAKE_ADDRESS, BURN_ADMIN_ADDRESS);
    await TabiSwapFarm.deployed();

    console.log(`TabiSwapFarm deployed at: ${TabiSwapFarm.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
// npx hardhat run scripts/deploytabiSwapFarm.js --network MonadChain