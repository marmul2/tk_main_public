(
  function () {
    angular
    .module("tokenLoan")
    .controller("newLoanRequestCtrl", function ($scope, $uibModalInstance, LRService) {
        console.log("newLoanRequestCtrl");

      //新建ｔｏｋｅｎ借贷请求
      $scope.newTokenLoanRequest = function () {
          console.log("newTokenLoanRequest");
          // web3.eth.contract(config.LEDGERABI).at(config.ETH_MAIN_ADDRESS).createNewLendingRequest do
          // {from:web3.eth.defaultAccount, gasPrice:15000000000, value:config.BALANCE_FEE_AMOUNT_IN_WEI}
          //     (err,res)->
          // if err => console.log \err: err
          // if res
          //     console.log \thash: res
          // state.set \transact-to-address config.ETH_MAIN_ADDRESS
          // state.set \transact-value      state.get(\fee-sum)
          // Router.go \success
          LRService.newLoanRequest(function (e, result) {
              console.log('init, newLoanRequest = ' + result);
          //    成功跳首页 need todo
          }).call();

      };

      //新建域名借贷请求
      $scope.newDomainLoanRequest = function () {
          console.log("newDomainLoanRequest");
      };

      //新建信用借贷请求
      $scope.newCreditLoanRequest = function () {
          console.log("newCreditLoanRequest");
      };


      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };

    });
  }
)();
