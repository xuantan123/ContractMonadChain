class SimpleMint {
    constructor() {
        this.button = document.getElementById('mint-btn');
        this.setupButton();
    }
    
    setupButton() {
        this.button.addEventListener('click', () => this.mint());
    }
    
    async mint() {
        try {
            this.showLoading();
            
            // Mint NFT
            const tx = await contract.mint(userAddress, 1, 100, {
                value: ethers.utils.parseEther("0.001")
            });
            
            await tx.wait();
            
            // Auto-trigger MetaMask add (no notification spam)
            setTimeout(() => {
                window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC1155',
                        options: {
                            address: CONTRACT_ADDRESS,
                            tokenId: '1',
                        },
                    },
                });
            }, 1000);
            
            this.showSuccess();
            
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    showLoading() {
        this.button.innerHTML = '⏳ Minting...';
        this.button.disabled = true;
    }
    
    showSuccess() {
        this.button.innerHTML = '✅ Success!';
        setTimeout(() => {
            this.button.innerHTML = '🎯 Mint NFT';
            this.button.disabled = false;
        }, 3000);
    }
    
    showError(msg) {
        this.button.innerHTML = '❌ Failed';
        alert('Mint failed: ' + msg);
        setTimeout(() => {
            this.button.innerHTML = '🎯 Mint NFT';
            this.button.disabled = false;
        }, 2000);
    }
}

new SimpleMint(); 