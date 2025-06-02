// Track conversion và revenue
class MintAnalytics {
    static trackMintStart() {
        // Google Analytics
        gtag('event', 'mint_started', {
            'event_category': 'NFT',
            'value': 0.001
        });
    }
    
    static trackMintSuccess(txHash) {
        // Revenue tracking
        gtag('event', 'purchase', {
            'transaction_id': txHash,
            'value': 0.001,
            'currency': 'ETH'
        });
        
        // Facebook Pixel
        fbq('track', 'Purchase', {
            value: 0.001,
            currency: 'ETH'
        });
    }
} 