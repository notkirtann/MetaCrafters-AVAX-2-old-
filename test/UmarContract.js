const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("This is a test for my UmarContract", () => {
  let owner, addr1, umarContract, signer;

  before("Deploy the contract instance first", async () => {
    const UmarContract = await ethers.getContractFactory("UmarContract");
    umarContract = await UmarContract.deploy();

    [owner, addr1] = await ethers.getSigners();
  });

  it("Should get the owner's name", async () => {
    const name = await umarContract.ownerName();
    assert.equal(name, "Umar");
  });

  it("should get the owner's balance", async () => {
    const bal = await umarContract.ownerBal();
    const balance = await ethers.provider.getBalance(owner);
    assert.equal(bal, balance);
  });

  it("Should tranfer ether to the owner", async () => {
    const contractConnect = umarContract.connect(addr1);

    const transferTx = await contractConnect.transferOwner({
      value: ethers.parseEther("10"),
    });

    await expect(transferTx)
      .to.emit(umarContract, "Transaction")
      .withArgs("Transaction successfull!!");
  });

  it("Should get an error for 0 ethers", async () => {
    const contractConnect = umarContract.connect(addr1);

    await expect(
      contractConnect.transferOwner({
        value: ethers.parseEther("0"),
      })
    ).revertedWith("Amount should be more than 0");
  });
});
