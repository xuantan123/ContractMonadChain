/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
const { ethers } = require("ethers");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.6.6",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.7.0",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.4",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.4.18",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.0",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.20",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
      {
        version: "0.8.18",
        settings: { optimizer: { enabled: true, runs: 200 } }
      },
     ],
  },
  networks: {
    MonadChain: {
      url: process.env.URL ,
      accounts: [process.env.PRIVATE_KEY] ,
      chainId: 10143,
    },
  },
  // etherscan: {
  //   apiKey: {
  //     'tabi-testnet': 'empty'
  //   },
  //   customChains: [
  //     {
  //       network: "tabi-testnet",
  //       chainId: 9788,
  //       urls: {
  //         apiURL: "https://tabiv2-test.tabiscan.com/api",
  //         browserURL: "https://testnetv2.tabiscan.com:2233"
  //       }
  //     }
  //   ]
  // }
};
