const { ethers } = require("ethers");
const { network } = require("hardhat");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.URL);

const privateKey = process.env.PRIVATE_KEY; 
const wallet = new ethers.Wallet(privateKey, provider);

// 🏦 Địa chỉ hợp đồng WTABI (Token ERC-20)
const WTABIContractAddress = "0xCde9c6ad3f82f322AC86DC63eFF63bC405072F95"; 

const WTABI_ABI = [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "guy",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "Deposit",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "Withdrawal",
      "type": "event"
  },
  {
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "guy",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "src",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "dst",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "wad",
              "type": "uint256"
          }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "stateMutability": "payable",
      "type": "receive"
  }
];
const WTABIContract = new ethers.Contract(WTABIContractAddress, WTABI_ABI, wallet);

async function checkWTABIBalance() {
    const balance = await WTABIContract.balanceOf(wallet.address);
    console.log(`📦 Số dư WTABI: ${ethers.utils.formatEther(balance)} WTABI`);
    return balance;
}

async function unwrapA0GI(amount) {
    try {
        console.log(`🔄 Unwrapping ${ethers.utils.formatEther(amount)} WTABI to TABI...`);

        // 📝 Gửi giao dịch để unwrap WTABI về TABI
        const tx = await WTABIContract.withdraw(amount);
        console.log(`📜 Giao dịch gửi đi: ${tx.hash}`);

        // ⏳ Chờ giao dịch được xác nhận
        await tx.wait();
        console.log("✅ WTABI đã được đổi ngược lại thành TABI thành công!");

    } catch (error) {
        console.error("❌ Lỗi unwrap WTABI:", error);
    }
}
async function checkNativeBalance() {
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Số dư TABI hiện tại: ${ethers.utils.formatEther(balance)} TABI`);
}

  
// 💰 Nhập số lượng TABI muốn wrap (Ví dụ: 0.1 TABI)
const amountToUnwrap = ethers.utils.parseEther("0.00009"); // 0.1 TABI

(async () => {
    await checkWTABIBalance();
    await checkNativeBalance(); // Trước khi unwrap
    await unwrapA0GI(amountToUnwrap);
    await checkNativeBalance(); // Sau khi unwrap
})();


// npx hardhat run test/UnWrappTABI.js --network TabiChain