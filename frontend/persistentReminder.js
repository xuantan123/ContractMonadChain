class PersistentNFTReminder {
    constructor() {
        this.pendingNFTs = JSON.parse(localStorage.getItem('pendingNFTs') || '[]');
        this.showPendingReminders();
    }
    
    addPendingNFT(tokenId, txHash) {
        this.pendingNFTs.push({
            tokenId,
            txHash,
            timestamp: Date.now()
        });
        localStorage.setItem('pendingNFTs', JSON.stringify(this.pendingNFTs));
        this.showPendingReminders();
    }
    
    removePendingNFT(tokenId) {
        this.pendingNFTs = this.pendingNFTs.filter(nft => nft.tokenId !== tokenId);
        localStorage.setItem('pendingNFTs', JSON.stringify(this.pendingNFTs));
    }
    
    showPendingReminders() {
        if (this.pendingNFTs.length > 0) {
            const reminder = document.createElement('div');
            reminder.className = 'persistent-reminder';
            reminder.innerHTML = `
                <div class="reminder-content">
                    <h4>📱 ${this.pendingNFTs.length} NFT(s) waiting to be added to MetaMask</h4>
                    ${this.pendingNFTs.map(nft => `
                        <div class="pending-nft">
                            <span>Token ID: ${nft.tokenId}</span>
                            <button onclick="addAndRemove(${nft.tokenId})">Add to MetaMask</button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Remove existing reminder
            document.querySelector('.persistent-reminder')?.remove();
            document.body.appendChild(reminder);
        }
    }
}

const reminder = new PersistentNFTReminder();

async function addAndRemove(tokenId) {
    const added = await metaMaskHelper.addNFTToMetaMask(tokenId);
    if (added) {
        reminder.removePendingNFT(tokenId);
        reminder.showPendingReminders();
    }
}

// Add to pending after mint
function onMintSuccess(tokenId, txHash) {
    reminder.addPendingNFT(tokenId, txHash);
} 