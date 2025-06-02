showMintSuccessNotification(tokenId, txHash) {
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
                <p><strong>Transaction:</strong> <a href="https://explorer.monad.xyz/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a></p>
                <p>⚠️ <strong>Important:</strong> Click below to add NFT to MetaMask (it won't appear automatically)</p>
                <button class="add-nft-btn pulse" onclick="metaMaskHelper.addNFTToMetaMask(${tokenId})">
                    📱 Add to MetaMask Now
                </button>
                <p class="countdown">Auto-hiding in <span id="countdown">30</span> seconds</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Countdown timer
    let seconds = 30;
    const countdownEl = notification.querySelector('#countdown');
    const timer = setInterval(() => {
        seconds--;
        countdownEl.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            notification.remove();
        }
    }, 1000);
} 