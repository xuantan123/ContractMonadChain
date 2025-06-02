const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
    // 📌 Lấy danh sách các contract đã deploy
    const deployments = await ethers.getSigners();
    const deployer = deployments[0];

    console.log("🚀 Đang lấy địa chỉ contract với tài khoản:", deployer.address);

    // 🏭 Lấy contract t0GDEXCall
    const tabiSwapFactory = await ethers.getContractFactory("tabiSwapFactory");

    // ⚡ Triển khai contract (hoặc lấy từ file cấu hình nếu đã deploy trước đó)
    const factory = await tabiSwapFactory.deploy(deployer.address);
    await factory.deployed();

    console.log("✅ Địa chỉ tabiSwapFactory:", factory.address);
}

// 🚀 Chạy script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Lỗi:", error.message);
        process.exit(1);
    });


// npx hardhat run scripts/getTabiSwapFactory.js --network MonadChain