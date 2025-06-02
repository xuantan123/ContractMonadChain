const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0x97e78142C89F9aA925E20E7BacE041464Fd832E0";

async function setCorrectURI() {
    try {
        const contract = await ethers.getContractAt("LiPage", contractAddress);
        
        // Set baseURI to your metadata server
        const baseURI = "https://your-metadata-server.com/metadata/";
        // hoặc IPFS: "https://gateway.pinata.cloud/ipfs/YOUR_HASH/"
        
        const tx = await contract.setURI(baseURI);
        await tx.wait();
        
        console.log("✅ BaseURI set successfully");
        
        // Verify
        const newURI = await contract.uri(1);
        console.log(`New URI for token 1: ${newURI}`);
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

setCorrectURI(); 