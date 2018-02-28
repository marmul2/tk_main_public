var txDefaultOrig =
{
  gasLimit: 3141592,
  gasPrice: 18000000000,
  // ethereumNode: "https://mainnet.infura.io:443",
  ethereumNode: "http://192.168.0.166:8545",
  // loanEthMainAddress: "0x0d9958ad3599571B239AFD323B2a464AdB03949a", //mainlend address
  loanEthMainAddress: '0xc122a11a6cc53a91cffc9498767fc2deb177b193',  //testrpc
  STKContractAddress: '0xD47d6D1Fd856cE0CE3eE2BB28Bd627e6a3132932',  //测试币地址
  connectionChecker:{
      checkInterval: 5000
  },
  wallet: "injected",
  defaultChainID: null,
  // Mainnet
  // walletFactoryAddress: "0x6e95c8e8557abc08b46f3c347ba06f8dc012763f",
    walletFactoryAddress: "0xcba56351f3c414cb3590af81b682778f56d336b6",
  //ledgerAPI: "http://localhost:" + ledgerPort,

};


var txDefault = {
  ethereumNodes : [
    {
      url : "https://mainnet.infura.io:443",
      name: "Remote Mainnet"
    },
    {
      url : "https://ropsten.infura.io:443",
      name: "Remote Ropsten"
    },
    {
      url : "https://kovan.infura.io:443",
      name: "Remote Kovan"
    },
    {
      url : "http://localhost:8545",
      name: "Local node"
    }
  ],
 
};

/**
* Reload configuration
*/
function loadConfiguration () {
  var userConfig = JSON.parse(localStorage.getItem("userConfig"));
  Object.assign(txDefault, txDefaultOrig, userConfig);
}

loadConfiguration();
