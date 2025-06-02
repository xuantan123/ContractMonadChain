// Auto-share sau khi mint
function showShareOptions(txHash) {
    const shareText = `Just minted my NFT! 🎉\n\nTransaction: ${txHash.slice(0,10)}...\n\n#NFT #Crypto`;
    
    // Twitter share
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    
    // Discord webhook
    fetch('YOUR_DISCORD_WEBHOOK', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `🎉 New mint! User: ${userAddress.slice(0,6)}... | TX: ${txHash.slice(0,10)}...`
        })
    });
} 