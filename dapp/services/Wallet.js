(
  function () {
    angular
    .module('tokenLoan')
    .service('Wallet', function ($window, $http, $q, $rootScope, $uibModal, Utils, ABI, Connection, Web3Service) {

      // Init wallet factory object
      var wallet = {
        wallets: JSON.parse(localStorage.getItem("wallets")) || {},
        json : abiJSON,
        txParams: {
          nonce: null,
          gasPrice: txDefault.gasPrice,
          gasLimit: txDefault.gasLimit
        },
        accounts: [],
        methodIds: {},
        updates: 0,

      };

      wallet.addMethods = function (abi) {
        abiDecoder.addABI(abi);
      };

      /**
      * Returns all the wallets saved in the
      * Browser localStorage
      */
      wallet.getAllWallets = function () {
        try {
          return JSON.parse(localStorage.getItem("wallets")) || {};
        } catch (error) {
          return {};
        }
      };

      wallet.getGasPrice = function () {
        return $q(
          function(resolve, reject){
            Web3Service.web3.eth.getGasPrice(
              function (e, gasPrice) {
                if (e) {
                  reject(e);
                }
                else {
                  resolve(gasPrice);
                }
              }
            );
          }
        );
      };


      /**
      * Return tx object, with default values, overwritted by passed params
      **/
      wallet.txDefaults = function (tx) {
        var txParams = {
          gasPrice: ethereumjs.Util.intToHex(wallet.txParams.gasPrice),
          gas: ethereumjs.Util.intToHex(wallet.txParams.gasLimit),
          from: Web3Service.coinbase
        };

        Object.assign(txParams, tx);
        return txParams;
      };

      /**
      * Return eth_call request object.
      * custom method .call() for direct calling.
      */
      wallet.callRequest = function (method, params, cb) {

        // Add to params the callback
        var methodParams = params.slice();
        methodParams.push(cb);

        // Get request object
        var request = method.request.apply(method, methodParams);
        request.call = function () {
            method.call.apply(method, methodParams);
        };
        return Object.assign({}, request, {
          method: 'eth_call',
          params: [
            {
              to: request.params[0].to,
              data: request.params[0].data
            },
            "latest"
          ]
        });
      };

      /**
      * For a given address and data, sign a transaction offline
      */
      wallet.offlineTransaction = function (address, data, nonce, cb) {
        // Create transaction object
        var txInfo = {
          from: Web3Service.coinbase,
          to: address,
          value: ethereumjs.Util.intToHex(0),
          gasPrice: ethereumjs.Util.intToHex(wallet.txParams.gasPrice),
          gas: ethereumjs.Util.intToHex(wallet.txParams.gasLimit),
          nonce: nonce?nonce:ethereumjs.Util.intToHex(wallet.txParams.nonce),
          data: data
        };

        Web3Service.web3.eth.signTransaction(txInfo, function(e, signed) {
          if (e) {
            cb(e);
          }
          else{
            cb(e, signed.raw);
          }
        });
      };


      wallet.updateNonce = function (address, cb) {
        return Web3Service.web3.eth.getTransactionCount.request(
          address,
          "pending",
          function (e, count) {
            if (e) {
              cb(e);
            }
            else {
              wallet.txParams.nonce = count;
              cb(null, count);
            }
          }
        );
      };

      wallet.updateGasPrice = function (cb) {
        if (Connection.isConnected) {
          return Web3Service.web3.eth.getGasPrice.request(
            function (e, gasPrice) {
              if (e) {
                cb(e);
              }
              else {
                wallet.txParams.gasPrice = gasPrice.toNumber();
                cb(null, gasPrice);
              }
            }
          );
        }
        else {
          cb(null, txDefault.gasPrice);
        }
      };

      wallet.updateGasLimit = function (cb) {
        if (Connection.isConnected) {
          return Web3Service.web3.eth.getBlock.request(
            "latest",
            function (e, block) {
              if (e) {
                cb(e);
              }
              else {
                wallet.txParams.gasLimit = Math.floor(block.gasLimit*0.9);
                cb(null, block.gasLimit);
              }
            }
          );
        }
        else {
          cb(null, txDefault.gasLimit);
        }
      };

      // Init txParams
      wallet.initParams = function () {
        return $q(function (resolve, reject) {
            var batch = Web3Service.web3.createBatch();
            Web3Service
            .updateAccounts(
              function (e, accounts) {
                var promises = $q.all(
                  [
                    $q(function (resolve, reject) {
                      var request = wallet.updateGasLimit(function (e) {
                        if (e) {
                          reject(e);
                        }
                        else {
                          resolve();
                        }
                      });
                      if (request) {
                        batch.add(request);
                      }
                    }),
                    $q(function (resolve, reject) {
                      var request = wallet.updateGasPrice(function (e) {
                        if (e) {
                          reject(e);
                        }
                        else {
                          resolve();
                        }
                      });
                      if (request) {
                        batch.add(request);
                      }
                    }),
                    $q(function (resolve, reject) {
                      if (Web3Service.coinbase) {
                        batch.add(
                          wallet.updateNonce(Web3Service.coinbase, function (e) {
                            if (e) {
                              reject(e);
                            }
                            else {
                              resolve();
                            }
                          })
                        );
                      }
                      else {
                        resolve();
                      }
                    }),
                    $q(function (resolve, reject) {
                      if (Web3Service.coinbase) {
                        batch.add(
                          wallet.getBalance(Web3Service.coinbase, function (e, balance) {
                            if (e) {
                              reject(e);
                            }
                            else {
                              wallet.balance = balance;
                              resolve();
                            }
                          })
                        );
                      }
                      else {
                        resolve();
                      }
                    })
                  ]
                ).then(function () {
                  resolve();
                }, reject);

                batch.execute();
                return promises;
              }

            );
          }
        );

      };

      wallet.getBalance = function (address, cb) {
        return Web3Service.web3.eth.getBalance.request(address, cb);
      };

      wallet.restore = function (info, cb) {
        var instance = Web3Service.web3.eth.contract(wallet.json.multiSigDailyLimit.abi).at(info.address);
        // Check contract function works
        try {
          instance.MAX_OWNER_COUNT(function (e, count) {
            if (e && Connection.isConnected) {
              cb(e);
            }
            else {
              if ((!count && Connection.isConnected) || (count && count.eq(0) && Connection.isConnected)) {
                // it is not a wallet
                cb("Address " + info.address + " is not a wallet contract");
              }
              else {
                // Add wallet, add My account to the object by default, won't be
                // displayed anyway if user is not an owner, but if it is, name will be used
                if (Web3Service.coinbase) {
                  var coinbase = Web3Service.coinbase.toLowerCase();
                  info.owners = {};
                  info.owners[coinbase] = { address: coinbase, name: 'My Account'};
                }
                wallet.updateWallet(info);
                cb(null, info);
              }
            }
          });
        }
        catch (err) {
          cb(err);
        }
      };

      // MultiSig functions



      // Works as observer triggering for watch $scope
      wallet.triggerUpdates = function () {
        wallet.updates++;
      };

      /**
      * Returns a list of comprehensive logs, decoded from a list of encoded logs
      * Needs the abi to decode them
      **/
      wallet.decodeLogs = function (logs) {
        return abiDecoder.decodeLogs(logs);
      };

      return wallet;
    });
  }
)();
