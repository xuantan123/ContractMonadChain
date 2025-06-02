const { ethers } = require("ethers");

async function listenForMints() {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    // Listen for mint events
    contract.on("NFTMintedForUser", async (user, tokenId, amount, metadataURI, event) => {
        console.log(`🎉 NFT Minted!`);
        console.log(`User: ${user}`);
        console.log(`Token ID: ${tokenId}`);
        console.log(`Amount: ${amount}`);
        
        // Auto-import to MetaMask
        if (user.toLowerCase() === currentUserAddress.toLowerCase()) {
            await importer.showImportInstructions(tokenId.toString());
        }
    });
} 