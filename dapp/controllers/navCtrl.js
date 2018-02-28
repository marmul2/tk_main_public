(
  function () {
    angular
    .module('tokenLoan')
    .controller('navCtrl', function ($scope, Wallet, Web3Service, Config, Connection, Transaction, $interval, $sce, $location, $uibModal, Utils) {
      $scope.navCollapsed = true;

      $scope.config = Config.getConfiguration();

      // Reload config when it changes
      $scope.$watch(
        function () {
          return Config.updates;
        },
        function () {
          $scope.config = Config.getUserConfiguration();
        }
      );

      $scope.updateInfo = function () {

        /**
        * Setup Ethereum Chain infos
        */
        Transaction.getEthereumChain().then(
          function (data) {
            $scope.ethereumChain = data;
            txDefaultOrig.walletFactoryAddress = data.walletFactoryAddress;
            loadConfiguration(); // config.js
          }
        );

        if (!$scope.paramsPromise) {
          // init params
          $scope.paramsPromise = Wallet.initParams().then(function () {
            $scope.loggedIn = Web3Service.coinbase;
            $scope.coinbase = Web3Service.coinbase;
            $scope.nonce = Wallet.txParams.nonce;
            $scope.balance = Wallet.balance;
            $scope.paramsPromise = null;

            $scope.accounts = Web3Service.accounts;


          }, function (error) {

              var syncErrorShown = Config.getConfiguration('syncErrorShown');
              if (!syncErrorShown) {
                Utils.dangerAlert(error);
                Config.setConfiguration('syncErrorShown', true);
              }

          });
        }

        return $scope.paramsPromise;
      };

      $scope.onMakeSTK = function() {
            $uibModal.open({
                animation: false,
                templateUrl: 'partials/modals/makeSTK.html',
                size: 'lg',
                controller: function ($scope, $uibModalInstance, LRService, Web3Service) {
                    //新建ｔｏｋｅｎ借贷请求
                    $scope.makeSTK = function () {
                        LRService.createSTK(function (e, result) {
                            console.log('result = ' + result);
                            setTimeout(function () {
                                LRService.getBalance(Web3Service.coinbase, function (e, result) {
                                    console.log('balance = ' + result);
                                    $scope.stkAmount = result;
                                });
                            }, 2000);
                        });
                    };

                    $scope.sendSTK = function (contractAddress, testTokenAmount) {

                        console.log(" $scope.tokenAmount = " + $scope.testTokenAmount + " testTokenAmount = " + testTokenAmount);
                        if(testTokenAmount <= 0 ) {
                            Utils.dangerAlert("请输入需要发送的Token数量");
                        } else {
                            console.log("contractAddress = " + contractAddress + " $scope.tokenAmount = " + testTokenAmount);
                            LRService.sendToken(contractAddress, new Web3().toBigNumber(testTokenAmount), function (e, result) {
                                //    发送成功
                                console.log(" result = " + result);
                                Utils.success("发送成功,交易结果:"+ result);

                                setTimeout(function () {
                                    LRService.getBalance(contractAddress, function (e, result) {
                                        $scope.addrSTKAmount = result;
                                    });
                                }, 1000);
                            });
                        }

                    };

                    $scope.getBalanceOfSTK = function (contractAddress) {
                        LRService.getBalance(contractAddress, function (e, result) {
                            $scope.addrSTKAmount = result;
                        });
                    };

                    setTimeout(function () {
                        LRService.getBalance(Web3Service.coinbase, function (e, result) {
                            $scope.stkAmount = result;
                        });
                    }, 500);

                }
            });
       }

      /**
      * Updates connection status
      */
      $scope.statusIcon = $sce.trustAsHtml('<i class=\'fa fa-refresh fa-spin fa-fw\' aria-hidden=\'true\'></i>');

      $scope.updateConnectionStatus = function () {
        $scope.$watch(function(){
          $scope.connectionStatus = Connection.isConnected;
          $scope.statusIcon = Connection.isConnected ? $sce.trustAsHtml('在线 <i class=\'fa fa-circle online-status\' aria-hidden=\'true\'></i>') : $sce.trustAsHtml('<i class=\'fa fa-refresh fa-spin fa-fw\' aria-hidden=\'true\'></i> 离线 <i class=\'fa fa-circle offline-status\' aria-hidden=\'true\'></i>');
        });

      };

      Web3Service.webInitialized.then(
        function () {
          $scope.interval = $interval($scope.updateInfo, 5000);

          /**
          * Lookup connection status
          * Check connectivity first on page loading
          * and then at time interval
          */
          Connection.checkConnection();
          $scope.updateConnectionStatus();
          $scope.connectionInterval = $interval($scope.updateConnectionStatus, txDefault.connectionChecker.checkInterval);

          $scope.updateInfo();
        }
      );

      $scope.$on('$destroy', function () {
        $interval.cancel($scope.interval);
      });

      $scope.getMenuItemClass = function (path) {
        if ($location.path() == path) {
          return 'active';
        }
      };
    });
  }
)();
