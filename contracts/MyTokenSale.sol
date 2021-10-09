// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;


import "./MyToken.sol";
contract MyTokenSale  {

    uint256 public tokenprice;
    MyToken public token;
    address owner;
    uint256 public tokensold;
    uint256 public value ; 
    uint256 public no;
    
    constructor(MyToken _token,uint256 _tokenprice ) public
        {
        owner=msg.sender;
        token=_token;
        tokenprice=_tokenprice;

    }
    event Sell(address _buyer, uint256 _amount);
   

    function buu(uint number) public payable {
  
          //require((tokenprice*number)==msg.value,"Not enough ether to purchase token");
        no=number;
      
        require(token.transfer(msg.sender, number));

        tokensold+=number;
        emit Sell(msg.sender, number);

    }
    function sold() public view returns(uint256){
      return tokensold;
    }
    function amount() public view returns(uint256){
      
      return (tokenprice*no);

    }
 function price() public view returns(uint256){
  return tokenprice;
 }


   
   }