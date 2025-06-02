const { ethers } = require("ethers");
require("dotenv").config();

async function listenSwapEvents() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
    const ROUTER_ADDRESS = "0xYourRouterAddress";
    
    const router = new ethers.Contract(ROUTER_ADDRESS, [
        "event SwapMilestone(address indexed user, uint256 swapCount)"
    ], provider);
    
    console.log("👀 Listening for SwapMilestone events...");
    
    // Listen for new events
    router.on("SwapMilestone", (user, swapCount, event) => {
        console.log(`🎉 SwapMilestone Event Detected!`);
        console.log(`   User: ${user}`);
        console.log(`   Swap Count: ${swapCount}`);
        console.log(`   Block: ${event.blockNumber}`);
        console.log(`   Transaction: ${event.transactionHash}`);
        
        if (swapCount.toString() === "3") {
            console.log(`✅ User ${user} can now MINT NFTs!`);
        }
    });
    
    // Keep script running
    process.stdin.resume();
}

listenSwapEvents().catch(console.error); 