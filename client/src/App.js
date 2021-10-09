
import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";

import getWeb3 from "./getWeb3";

import "./App.css";
 var val;
class App extends Component {
  state = { loaded:false,address:"...", tokenSold: 0, totalToken:0 ,rice:0,amount:0,progress:0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
    
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] &&  MyToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
       MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );  
    

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
  
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  
 
   
 numberChange =async (event)=>{
   console.log(this.accounts[0]);
    val=event.target.value;
    this.setState({recieve:this.accounts[0]});
    let userTokens = await this.tokenInstance.methods.total().call();
    this.setState({totalToken: userTokens});
    
    this.web3.eth.getCoinbase((err,acc)=>{
    if(err===null){
    this.setState({address:acc});
      }
    })
    let x= await this.tokenSaleInstance.methods.price().call();
  this.setState({rice:x});
 }

  
  numberToken = async () => {
    let p=this.state.rice;
    await this.tokenSaleInstance.methods.buu(val).send({from: this.accounts[0], value: val*p,gas:500000});
    let y=  await this.tokenSaleInstance.methods.sold().call();
   this.setState({tokenSold:y});
     await alert(y+"  亀 tokensold"); 
     let t=this.state.totalToken;
     let b=(y/t)*100;
     this.setState({progress:b});

}
  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
      <div className="nav">
      <img src= {'https://www.click4tees.com/image/cache/catalog/products_2018/d380957-1080x1080.jpg'} alt="logo" />
        <h1>Dragon ball Token Sale</h1>
        <h2>ドラゴンボール</h2>
        </div>
        <p>Get your Tokens today!</p>
      <span >   No. of token: </span><input type="number" name="Number of token" onChange={this.numberChange} />
        <button type="button" onClick={this.numberToken}>Buy Tokens</button>
        <p>Send ether to this account :{MyTokenSale.networks[this.networkId].address} to recive your 亀 tokens</p>
  
    

        <p>Your account: {this.state.address}</p>
        <p>You currently have: {this.state.totalToken} Dragon ball token</p>
       <p>Sold {this.state.tokenSold} tokens </p>
       <progress id="file" value={this.state.progress} max={100}> 32% </progress>
       <p>Price of one token is :{this.state.rice} Wei</p>
       
      </div>
    );
  }
}

export default App;
