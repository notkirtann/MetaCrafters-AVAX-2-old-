// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract KirtanContract {
  
  string public ownerName;
  address payable ownerAdd;

  constructor() {
    ownerName = "Kirtan";
    ownerAdd=payable(msg.sender);
  }
  
  event Transaction(string);

  function transferOwner() payable public {

    require(msg.value > 0 ether,"Amount should be more than 0");
    require(msg.value <= msg.sender.balance, "Insufficient balance");
    ownerAdd.transfer(msg.value);

    emit Transaction("Transaction successfull!!");

  } 

  function ownerBal() public view returns (uint256){

    return ownerAdd.balance;

  }

  
}