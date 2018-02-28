var web3 = window.web3;
angular.module('tokenLoan')
  .run(function(Web3Service) {
    Web3Service.webInitialized.then(function () {
      web3 = Web3Service.web3;
    });
  });
