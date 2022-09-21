import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Donation Contract Testing...", function () {
  const amount = 0.01 * 1e18;

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDonationContractFixture() {
    const [owner, sender, recipient] = await ethers.getSigners();
    const Donation = await ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    return { donation, owner, sender, recipient };
  }
  
  it("Deploy contract...", async function() {
    const { donation, owner } = await loadFixture(deployDonationContractFixture);

    console.log("Donation deployed to: ", donation.address);

    expect(await donation.owner()).to.equal(owner.address);
  });

  it("Donate testing...", async function() {
    const { donation, owner, sender,  recipient } = await loadFixture(deployDonationContractFixture);
    donation.connect(sender).donate(recipient, { value: amount });

    expect(await donation.connect(owner).recipients(recipient)).to.equal(amount);
  });

  it("Withdraw testing...", async function() {
    const { donation, owner, sender,  recipient } = await loadFixture(deployDonationContractFixture);
    donation.connect(sender).donate(recipient, { value: amount });
    donation.connect(recipient).withdraw({ value: amount })

    expect(await donation.connect(owner).recipients(recipient)).to.equal(0);
  });
});
