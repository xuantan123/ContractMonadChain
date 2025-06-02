const { ethers } = require("ethers");
require("dotenv").config();

async function setCorrectURI() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const contractAddress = "0x97e78142C89F9aA925E20E7BacE041464Fd832E0";
    
    try {
        const contract = await ethers.getContractAt("LiPage", contractAddress, signer);
        
        // Set baseURI - thay đổi URL này thành server metadata của bạn
        const baseURI = "https://your-actual-metadata-server.com/metadata/";
        // Hoặc dùng IPFS: "https://gateway.pinata.cloud/ipfs/YOUR_HASH/"
        
        console.log(`Setting baseURI to: ${baseURI}`);
        
        const tx = await contract.setURI(baseURI);
        console.log(`📋 Transaction hash: ${tx.hash}`);
        
        await tx.wait();
        console.log("✅ BaseURI set successfully");
        
        // Verify
        const newURI = await contract.uri(1);
        console.log(`🔍 New URI for token 1: ${newURI}`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

setCorrectURI(); 