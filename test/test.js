const { expect } = require("chai");
const hre = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("PriceBetting", function () {
	let PriceBetting, priceBetting;
	beforeEach(async function () {
		PriceBetting = await hre.ethers.getContractFactory("PriceBetting");
		priceBetting = await PriceBetting.deploy();
		await priceBetting.deployed();
	});

	it("should return 0", async function () {
		expect(await priceBetting.getBalance()).to.equal(0);
	});

	it("emit timer event", async function () {
		const price = 156492;
		expect(await priceBetting.setBet(price))
			.to.emit(priceBetting, "startTimer")
			.withArgs(start);
	});

	it("should fail to emit won", async function () {
		expect(await priceBetting.result()).to.emit(priceBetting, "won");
	});
});
