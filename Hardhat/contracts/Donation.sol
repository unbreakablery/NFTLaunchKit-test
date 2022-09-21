// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Donation {
    uint256 public totalAmount;
    uint256 public donations;
    mapping (address => uint256) public receipts;

    event Donate(address indexed sender, address indexed receipt, uint256 amount);
    event Withdraw(address indexed receipt, uint256 amount);

    function donate(address recipient) external payable {
        require(recipient != address(0), "Invalid receipt");
        receipts[recipient] += msg.value;
        totalAmount += msg.value;
        donations++;
        emit Donate(msg.sender, recipient, msg.value);
    }

    function withdraw() external {
        uint256 balance = receipts[msg.sender];
        require(balance > 0, "No balance");

        receipts[msg.sender] = 0;
        payable(msg.sender).transfer(balance);

        emit Withdraw(msg.sender, balance);
    }
}
