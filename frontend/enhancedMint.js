class EnhancedMint {
    constructor() {
        this.isMetaMask = window.ethereum?.isMetaMask;
        this.button = document.getElementById('mint-btn');
        this.setupButton();
        
        if (this.isMetaMask) {
            this.showMetaMaskWarning();
        }
    }
    
    async mint() {
        try {
            this.showLoading();
            
            // Mint NFT
            const tx = await contract.mint(userAddress, 1, 100, {
                value: ethers.utils.parseEther("0.001")
            });
            
            await tx.wait();
            console.log('✅ NFT minted successfully');
            
            // MetaMask specific handling
            if (this.isMetaMask) {
                await this.handleMetaMaskNFT();
            } else {
                await this.handleOtherWallets();
            }
            
            this.showSuccess();
            
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    async handleMetaMaskNFT() {
        console.log('🦊 Handling MetaMask NFT display...');
        
        // Wait a bit for blockchain to update
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try {
            // Try auto-add
            const added = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC1155',
                    options: {
                        address: CONTRACT_ADDRESS,
                        tokenId: '1',
                    },
                },
            });
            
            if (!added) {
                this.showManualInstructions();
            }
            
        } catch (error) {
            console.log('Auto-add failed, showing manual instructions');
            this.showManualInstructions();
        }
    }
    
    async handleOtherWallets() {
        // For other wallets, NFTs usually appear automatically
        console.log('✅ NFT should appear in your wallet automatically');
    }
    
    showMetaMaskWarning() {
        const warning = document.createElement('div');
        warning.className = 'metamask-warning';
        warning.innerHTML = `
            <div class="warning-content">
                <h4>🦊 MetaMask User Notice</h4>
                <p>MetaMask may need manual NFT import. We'll guide you through it!</p>
                <p><strong>Recommended:</strong> Use HaHa Wallet for better Monad NFT experience.</p>
            </div>
        `;
        
        document.querySelector('.mint-box').insertBefore(warning, document.getElementById('mint-btn'));
    }
    
    showManualInstructions() {
        const modal = document.createElement('div');
        modal.className = 'instruction-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>📱 Add NFT to MetaMask</h3>
                <p>Your NFT was minted successfully! To see it in MetaMask:</p>
                <ol>
                    <li>Open MetaMask</li>
                    <li>Go to <strong>NFTs</strong> tab</li>
                    <li>Click <strong>"Import NFT"</strong></li>
                    <li>Contract Address: <code>${CONTRACT_ADDRESS}</code></li>
                    <li>Token ID: <code>1</code></li>
                    <li>Click <strong>"Add"</strong></li>
                </ol>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">
                    Got it! ✅
                </button>
                <p class="tip">💡 <strong>Tip:</strong> HaHa Wallet shows NFTs automatically!</p>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // ... other methods ...
} 