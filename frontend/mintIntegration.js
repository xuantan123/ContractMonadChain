async function mintNFT() {
    try {
        // Show loading
        document.getElementById('mint-btn').disabled = true;
        document.getElementById('mint-btn').textContent = 'Minting...';
        
        // Mint NFT
        const tx = await contract.mint(userAddress, tokenId, amount, {
            value: mintFee
        });
        
        console.log('📋 Transaction submitted:', tx.hash);
        
        // Show pending notification
        showPendingNotification(tx.hash);
        
        // Wait for confirmation
        const receipt = await tx.wait();
        console.log('✅ Mint confirmed!');
        
        // Remove pending notification
        removePendingNotification();
        
        // Show success notification with auto-add button
        metaMaskHelper.showMintSuccessNotification(tokenId, tx.hash);
        
        // Reset button
        document.getElementById('mint-btn').disabled = false;
        document.getElementById('mint-btn').textContent = 'Mint NFT';
        
    } catch (error) {
        console.error('❌ Mint failed:', error);
        
        // Reset button
        document.getElementById('mint-btn').disabled = false;
        document.getElementById('mint-btn').textContent = 'Mint NFT';
        
        // Show error
        alert('Mint failed: ' + error.message);
    }
}

function showPendingNotification(txHash) {
    const pending = document.createElement('div');
    pending.id = 'pending-notification';
    pending.className = 'pending-notification';
    pending.innerHTML = `
        <div class="notification-content">
            <h3>⏳ Minting in progress...</h3>
            <p>Transaction: <a href="https://testnet-explorer.monad.xyz/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a></p>
            <div class="loading-spinner"></div>
        </div>
    `;
    document.body.appendChild(pending);
}

function removePendingNotification() {
    const pending = document.getElementById('pending-notification');
    if (pending) {
        pending.remove();
    }
} 