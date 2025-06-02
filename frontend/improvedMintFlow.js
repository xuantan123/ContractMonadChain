async function mintNFT() {
    try {
        // Mint NFT
        const tx = await contract.mint(userAddress, tokenId, amount, {
            value: mintFee
        });
        
        await tx.wait();
        console.log('✅ Mint confirmed!');
        
        // Show success notification
        metaMaskHelper.showMintSuccessNotification(tokenId, tx.hash);
        
        // Auto-trigger MetaMask popup after 2 seconds
        setTimeout(async () => {
            const added = await metaMaskHelper.addNFTToMetaMask(tokenId);
            if (added) {
                console.log('🎉 NFT added to MetaMask automatically!');
                // Hide notification since NFT was added
                document.querySelector('.mint-success-notification')?.remove();
            }
        }, 2000);
        
    } catch (error) {
        console.error('❌ Mint failed:', error);
    }
} 