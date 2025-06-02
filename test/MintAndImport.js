const { ethers } = require("ethers");
require("dotenv").config();

async function mintAndShowImportInfo() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const contractAddress = "0x97e78142C89F9aA925E20E7BacE041464Fd832E0";
    const userAddress = await signer.getAddress();
    
    try {
        const contract = await ethers.getContractAt("LiPage", contractAddress, signer);
        
        // Mint NFT
        console.log("🎯 Minting NFT...");
        const tokenId = 1;
        const amount = 100;
        const mintFee = ethers.utils.parseEther("0.001"); // Adjust fee as needed
        
        const tx = await contract.mint(userAddress, tokenId, amount, {
            value: mintFee
        });
        
        console.log(`📋 Mint transaction: ${tx.hash}`);
        await tx.wait();
        console.log("✅ Mint successful!");
        
        // Check balance
        const balance = await contract.balanceOf(userAddress, tokenId);
        console.log(`📊 Your balance: ${balance.toString()}`);
        
        // Show import instructions
        console.log(`\n🔧 To see NFT in MetaMask:`);
        console.log(`   1. Open MetaMask`);
        console.log(`   2. Go to NFTs tab`);
        console.log(`   3. Click "Import NFT"`);
        console.log(`   4. Contract Address: ${contractAddress}`);
        console.log(`   5. Token ID: ${tokenId}`);
        console.log(`   6. Click "Add"`);
        
        // Get metadata info
        const uri = await contract.uri(tokenId);
        console.log(`\n📋 NFT Details:`);
        console.log(`   Contract: ${contractAddress}`);
        console.log(`   Token ID: ${tokenId}`);
        console.log(`   Amount: ${balance.toString()}`);
        console.log(`   Metadata URI: ${uri}`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

mintAndShowImportInfo(); 