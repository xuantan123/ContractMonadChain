class SmartMintButton {
    constructor(contractAddress, contract) {
        this.contractAddress = contractAddress;
        this.contract = contract;
        this.button = document.getElementById('smart-mint-btn');
        this.setupButton();
    }
    
    setupButton() {
        this.button.addEventListener('click', () => this.handleMintAndAdd());
    }
    
    async handleMintAndAdd() {
        try {
            // Step 1: Mint NFT
            await this.mintNFT();
            
            // Step 2: Auto-add to MetaMask
            await this.addToMetaMask();
            
        } catch (error) {
            this.handleError(error);
        }
    }
    
    async mintNFT() {
        this.updateButton('🔄 Minting...', true);
        
        const tokenId = 1;
        const amount = 100;
        const mintFee = ethers.utils.parseEther("0.001");
        
        // Mint transaction
        const tx = await this.contract.mint(userAddress, tokenId, amount, {
            value: mintFee
        });
        
        this.updateButton('⏳ Confirming...', true);
        this.showProgress(`Transaction: ${tx.hash.slice(0,10)}...`);
        
        await tx.wait();
        console.log('✅ Mint confirmed!');
        
        // Store for next step
        this.lastMintedTokenId = tokenId;
        this.lastTxHash = tx.hash;
    }
    
    async addToMetaMask() {
        this.updateButton('📱 Adding to MetaMask...', true);
        
        try {
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC1155',
                    options: {
                        address: this.contractAddress,
                        tokenId: this.lastMintedTokenId.toString(),
                    },
                },
            });
            
            if (wasAdded) {
                this.showSuccess('🎉 NFT Minted & Added to MetaMask!');
            } else {
                this.showPartialSuccess('✅ NFT Minted! (You declined MetaMask import)');
            }
            
        } catch (error) {
            console.error('MetaMask add failed:', error);
            this.showPartialSuccess('✅ NFT Minted! (MetaMask import failed)');
        }
        
        this.resetButton();
    }
    
    updateButton(text, disabled = false) {
        this.button.textContent = text;
        this.button.disabled = disabled;
        
        if (disabled) {
            this.button.classList.add('loading');
        } else {
            this.button.classList.remove('loading');
        }
    }
    
    showProgress(message) {
        const progressEl = document.getElementById('mint-progress');
        if (progressEl) {
            progressEl.textContent = message;
            progressEl.style.display = 'block';
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showPartialSuccess(message) {
        this.showNotification(message + ' Click below to add manually:', 'warning', true);
    }
    
    showNotification(message, type = 'success', showManualButton = false) {
        const notification = document.createElement('div');
        notification.className = `smart-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                ${showManualButton ? `
                    <button class="manual-add-btn" onclick="smartMint.manualAdd()">
                        📱 Add to MetaMask
                    </button>
                ` : ''}
                <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds (unless manual button is shown)
        if (!showManualButton) {
            setTimeout(() => notification.remove(), 5000);
        }
    }
    
    async manualAdd() {
        try {
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC1155',
                    options: {
                        address: this.contractAddress,
                        tokenId: this.lastMintedTokenId.toString(),
                    },
                },
            });
            // Remove notification
            document.querySelector('.smart-notification.warning')?.remove();
        } catch (error) {
            console.error('Manual add failed:', error);
        }
    }
    
    resetButton() {
        this.updateButton('🎯 Mint NFT & Add to MetaMask', false);
        document.getElementById('mint-progress').style.display = 'none';
    }
    
    handleError(error) {
        console.error('❌ Error:', error);
        this.showNotification(`❌ Error: ${error.message}`, 'error');
        this.resetButton();
    }
}

// Initialize
let smartMint;
window.addEventListener('load', () => {
    smartMint = new SmartMintButton(CONTRACT_ADDRESS, contract);
}); 