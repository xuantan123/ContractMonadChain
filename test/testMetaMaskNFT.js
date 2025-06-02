async function testMetaMaskNFTSupport() {
    console.log('🔍 Testing MetaMask NFT support on Monad...');
    
    try {
        // Check network
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(`Current chain: ${chainId}`);
        
        // Check if Monad network
        if (chainId !== '0x...') { // Replace with actual Monad chain ID
            console.log('❌ Not on Monad network');
            return;
        }
        
        // Test contract call
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        const uri = await contract.uri(1);
        console.log(`📋 Token URI: ${uri}`);
        
        // Test metadata fetch
        try {
            const response = await fetch(uri);
            const metadata = await response.json();
            console.log(`✅ Metadata accessible:`, metadata);
        } catch (error) {
            console.log(`❌ Metadata not accessible: ${error.message}`);
        }
        
        // Test MetaMask NFT detection
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        
        const balance = await contract.balanceOf(userAddress, 1);
        console.log(`📊 NFT balance: ${balance.toString()}`);
        
        if (balance.gt(0)) {
            console.log(`✅ User has NFTs, testing MetaMask display...`);
            
            // Try auto-add to MetaMask
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
            
            console.log(`MetaMask add result: ${added}`);
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

// Run test
testMetaMaskNFTSupport(); 