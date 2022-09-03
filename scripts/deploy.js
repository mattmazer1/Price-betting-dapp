const hre = require("hardhat");

async function main() {
	const PriceBetting = await hre.ethers.getContractFactory("PriceBetting");
	const priceBetting = await PriceBetting.deploy();
	await priceBetting.deployed();
	console.log("Contract deployed to", priceBetting.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
