class MetaMaskNFTHelper {
    constructor(contractAddress) {
        this.contractAddress = contractAddress;
    }
    
    // Automatically add NFT to MetaMask after mint
    async addNFTToMetaMask(tokenId) {
        if (!window.ethereum) {
            console.log('MetaMask not installed');
            return false;
        }
        
        try {
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC1155',
                    options: {
                        address: this.contractAddress,
                        tokenId: tokenId.toString(),
                    },
                },
            });
            
            if (wasAdded) {
                console.log('✅ NFT added to MetaMask!');
                return true;
            } else {
                console.log('❌ User declined to add NFT');
                return false;
            }
        } catch (error) {
            console.error('Error adding NFT to MetaMask:', error);
            return false;
        }
    }
    
    // Show notification with auto-add button
    showMintSuccessNotification(tokenId, txHash) {
        const notification = this.createNotification(tokenId, txHash);
        document.body.appendChild(notification);
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 30000);
    }
    
    createNotification(tokenId, txHash) {
        const notification = document.createElement('div');
        notification.className = 'mint-success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <h3>🎉 NFT Minted Successfully!</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="notification-body">
                    <p><strong>Token ID:</strong> ${tokenId}</p>
                    <p><strong>Transaction:</strong> <a href="https://testnet-explorer.monad.xyz/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a></p>
                    <p>Click below to add NFT to MetaMask:</p>
                    <button class="add-nft-btn" onclick="metaMaskHelper.addNFTToMetaMask(${tokenId})">
                        📱 Add to MetaMask
                    </button>
                    <button class="manual-btn" onclick="metaMaskHelper.showManualInstructions(${tokenId})">
                        📝 Manual Instructions
                    </button>
                </div>
            </div>
        `;
        
        return notification;
    }
    
    showManualInstructions(tokenId) {
        alert(`Manual Import Instructions:
        
1. Open MetaMask
2. Go to NFTs tab
3. Click "Import NFT"
4. Contract Address: ${this.contractAddress}
5. Token ID: ${tokenId}
6. Click "Add"
        
Your NFT should appear in MetaMask!`);
    }
}

// Global instance
const metaMaskHelper = new MetaMaskNFTHelper('0x97e78142C89F9aA925E20E7BacE041464Fd832E0'); 