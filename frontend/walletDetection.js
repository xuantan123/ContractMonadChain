class WalletManager {
    static detectOptimalWallet() {
        if (window.haha) {
            return { name: 'HaHa', optimal: true };
        }
        if (window.okxwallet) {
            return { name: 'OKX', optimal: true };
        }
        if (window.ethereum?.isMetaMask) {
            return { name: 'MetaMask', optimal: false, warning: 'Limited Monad support' };
        }
        return { name: 'None', optimal: false };
    }
    
    static showWalletRecommendation() {
        const wallet = this.detectOptimalWallet();
        
        if (!wallet.optimal) {
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div class="wallet-recommendation">
                    <h3>⚠️ Better Wallet Available</h3>
                    <p>For optimal Monad NFT experience:</p>
                    <a href="https://haha.me" class="wallet-link">
                        📱 Download HaHa Wallet (Recommended)
                    </a>
                    <button onclick="this.parentElement.remove()">Continue with ${wallet.name}</button>
                </div>
            `;
            document.body.appendChild(modal);
        }
    }
} 