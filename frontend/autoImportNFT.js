class NFTAutoImporter {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
    }
    
    async detectNewNFTs(userAddress) {
        if (!window.ethereum) return;
        
        try {
            // Request to add NFT to MetaMask
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC1155',
                    options: {
                        address: this.contractAddress,
                        tokenId: '1', // Token ID as string
                    },
                },
            });
            
            console.log('✅ NFT added to MetaMask watch list');
        } catch (error) {
            console.log('❌ User rejected NFT import:', error);
        }
    }
    
    async showImportInstructions(tokenId) {
        const instructions = `
🎉 NFT Minted Successfully!

To see your NFT in MetaMask:
1. Open MetaMask
2. Go to NFTs tab  
3. Click "Import NFT"
4. Contract: ${this.contractAddress}
5. Token ID: ${tokenId}
6. Click "Add"

Or click the button below to auto-import:
        `;
        
        // Show modal or notification
        this.showNotification(instructions, tokenId);
    }
    
    showNotification(message, tokenId) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'nft-import-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>🎉 NFT Minted!</h3>
                <p>${message}</p>
                <button onclick="this.autoImport(${tokenId})" class="auto-import-btn">
                    Auto Import to MetaMask
                </button>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 30 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 30000);
    }
    
    async autoImport(tokenId) {
        await this.detectNewNFTs();
    }
}

// Usage in your dApp
const importer = new NFTAutoImporter('0x97e78142C89F9aA925E20E7BacE041464Fd832E0');

// After successful mint
async function onMintSuccess(tokenId) {
    await importer.showImportInstructions(tokenId);
} 