var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale");

require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    var tokenPrice = 1000000000000;  //0.001 ether
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  

    await deployer.deploy(MyTokenSale, MyToken.address,tokenPrice);
    // let instance = await MyToken.deployed();
   // await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);


}