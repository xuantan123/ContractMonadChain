const { ethers } = require("ethers");
require("dotenv").config();

async function forceRefresh() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const contractAddress = "0x97e78142C89F9aA925E20E7BacE041464Fd832E0";
    const userAddress = await signer.getAddress();
    
    try {
        const contract = await ethers.getContractAt("LiPage", contractAddress);
        
        console.log("🔄 Checking current NFT status...");
        
        // Check all tokens user owns
        for (let tokenId = 1; tokenId <= 5; tokenId++) {
            const balance = await contract.balanceOf(userAddress, tokenId);
            
            if (balance.gt(0)) {
                const uri = await contract.uri(tokenId);
                console.log(`\n✅ Token ${tokenId}:`);
                console.log(`   Balance: ${balance.toString()}`);
                console.log(`   URI: ${uri}`);
                
                // Test metadata accessibility
                if (uri) {
                    try {
                        const response = await fetch(uri);
                        if (response.ok) {
                            const metadata = await response.json();
                            console.log(`   ✅ Metadata accessible`);
                            console.log(`   Name: ${metadata.name}`);
                            console.log(`   Image: ${metadata.image}`);
                        } else {
                            console.log(`   ❌ Metadata not accessible: ${response.status}`);
                        }
                    } catch (error) {
                        console.log(`   ❌ Error fetching metadata: ${error.message}`);
                    }
                }
            }
        }
        
        console.log(`\n📋 Summary for MetaMask:`);
        console.log(`   Contract: ${contractAddress}`);
        console.log(`   User: ${userAddress}`);
        console.log(`   Network: Monad Testnet`);
        console.log(`\n💡 If MetaMask still doesn't show images:`);
        console.log(`   1. Reset MetaMask account`);
        console.log(`   2. Re-import NFTs manually`);
        console.log(`   3. Try different wallet`);
        console.log(`   4. Check on OpenSea testnet`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

forceRefresh(); 