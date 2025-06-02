const { ethers } = require("ethers");
require("dotenv").config();

async function checkNFTURI() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const contractAddress = "0x97e78142C89F9aA925E20E7BacE041464Fd832E0";
    const userAddress = await signer.getAddress();
    
    try {
        const contract = await ethers.getContractAt("LiPage", contractAddress);
        
        // Check URI for token 1
        const uri1 = await contract.uri(1);
        console.log(`📋 URI for token 1: ${uri1}`);
        
        // Check if URI returns valid JSON
        if (uri1 && uri1 !== "") {
            console.log(`🌐 Testing URL: ${uri1}`);
            
            try {
                const response = await fetch(uri1);
                if (response.ok) {
                    const metadata = await response.json();
                    console.log(`✅ Metadata found:`, metadata);
                } else {
                    console.log(`❌ URL returns ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.log(`❌ Cannot fetch metadata: ${error.message}`);
            }
        } else {
            console.log(`❌ No URI set for token`);
        }
        
        // Check balance
        const balance = await contract.balanceOf(userAddress, 1);
        console.log(`📊 Your balance: ${balance.toString()}`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

checkNFTURI(); 