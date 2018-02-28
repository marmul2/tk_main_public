(
  function () {
    angular
    .module('tokenLoan')
    .controller('mainCtrl', function (Web3Service, $rootScope, $scope, Wallet, Utils, $uibModal, $interval,$location, LRService) {
      Web3Service
      .webInitialized
      .then(
        function () {
            $scope.interval = $interval($scope.updateParams, 6000);
            $scope.wallets = Wallet.wallets;

            $scope.updateParams();

            var debug = false;
            if(debug) {
                setTimeout(function () {
                    LRService.createSTK();

                }, 1000);

            }
            // updateData(0);
            getFeeSum();
        }
      );

      $scope.wallets = {};



        $scope.getLrClass = function(state) {
          // console.log('getLrClass state = ' + state);
          if(state == 0) {
              return 'panel-primary';
          } else if( state == 1) {
              return 'panel-primary';
          } else if( state == 2) {
              return 'panel-success';
          } else if( state == 3) {
              return 'panel-primary';
          } else if( state == 4) {
              return 'panel-info';
          } else if( state == 5) {
              return 'panel-danger';
          } else if( state == 6) {
              return 'panel-success';
          } else {
              return 'panel-primary'
          }


      };

      var getStatusStr = function(state) {
          if(state == 0) {
              return '...';
          } else if( state == 1) {
              return '等待发送抵押币';
          } else if( state == 2) {
              return '已取消';
          } else if( state == 3) {
              return '等待出借人打币';
          } else if( state == 4) {
              return '借出人已完成打币';
          } else if( state == 5) {
              return '缺省';
          } else if( state == 6) {
              return '已完成';
          }

      }

      $scope.$watch(
        function () {
          return Wallet.updates;
        },
        function () {
          var walletsToCopy = Wallet.getAllWallets();

          for (wallet in walletsToCopy) {
            if (!$scope.wallets[wallet]) {
              $scope.wallets[wallet] = {};
            }
            Object.assign($scope.wallets[wallet], walletsToCopy[wallet]);
          }

          // Remove removed wallets
          for (wallet in $scope.wallets) {
            if (!walletsToCopy[wallet]) {
              delete $scope.wallets[wallet];
            }
          }
          $scope.totalItems = Object.keys($scope.wallets).length;
        }
      );

      $scope.updateParams = function () {
        $scope.batch = Web3Service.web3.createBatch();
        if ($scope.wallets) {
          // Init wallet balance of each wallet address
          Object.keys($scope.wallets).map(function (address) {
            $scope.batch.add(
              Wallet.getBalance(
                address,
                function (e, balance) {
                  if(!e && balance && $scope.wallets[address]){
                    $scope.$apply(function () {
                      $scope.wallets[address].balance = balance;
                    });
                  }
                }
              )
            );

          });
          $scope.batch.execute();
        }
        else {
          $scope.totalItems = 0;
        }

        //定时更新信息
        updateData($scope.curLrPage - 1);
      };



      $scope.$on('$destroy', function () {
        $interval.cancel($scope.interval);
        $interval.cancel( $scope.getLrTimer);
      });

      /*$scope.currentPage = 1;
      $scope.itemsPerPage = 5;*/

      //新借贷请求
      $scope.newLoanRequest = function () {
          console.log('newLoanRequest');
          // $uibModal.open({
          //     templateUrl: 'partials/modals/newLoanRequest.html',
          //     size: 'lg',
          //     controller: 'newLoanRequestCtrl',
          // })
          $uibModal.open({
              animation: false,
              templateUrl: 'partials/modals/newLoanRequest.html',
              size: 'lg',
              scope:$scope,
              controller: function ($scope, $uibModalInstance, LRService) {
                  //新建ｔｏｋｅｎ借贷请求
                  $scope.newTokenLoanRequest = function () {

                      LRService.newLoanRequest(function (e, result) {
                          console.log('init, newLoanRequest = ' + result + " e=" + JSON.stringify(e));
                          //    成功跳首页 need todo
                          Utils.success('创建借贷请求成功');
                          // setTimeout(function () {
                          //     updateData(0);
                          // }, 2000);
                          $uibModalInstance.dismiss();
                      });
                  };

                  //新建信用借贷请求
                  $scope.newCreditLoanRequest = function () {
                      console.log("newCreditLoanRequest");
                      LRService.newLoanRequestRep(function (e, result) {
                          console.log('init, newLoanRequest = ' + result);
                          //   更新
                          setTimeout(function () {
                              updateData(0);
                          }, 200);

                          $uibModalInstance.dismiss();
                      });
                  };

              }
          });
        };

      $scope.onLrClick = function (lrid) {
          $location.path('/loan-request/'+ lrid);
      };

      $scope.curLrPage = 1; //当前页
      $scope.totalPage = 0; //总计页
      $scope.numPerPage = 6; //每页子项数量
      $scope.totalLrItems = 0; //总计lr数量
      $scope.timer ={};
      $scope.loanRequests = [];
      //如果在第一页，定时刷新数量


        $scope.onPageAction = function (title, page, pageSize, total) {
            console.log("title" + title + " page = " + page + " pageSize = " + pageSize + " total = " + total);
            $scope.curLrPage = page;
            updateData($scope.curLrPage - 1);
        };


        function getFeeSum() {
            LRService.getFeeSum(function (e, result) {
                console.log("getFeeSum = " + result);
                $scope.feeSum = result;

            }).call();
        }

      var updateData = function (page) {

          getAllLrData(page, function (out) {
              console.log(" loanRequests = ", out);
              $scope.loanRequests = out;
          })
      };

      //  获取所有数据
      var getAllLrData = function (page, cb) {
          LRService.getLrCount(function (e, lrcount) {
              var out = [];
              var curItemNum =  page*$scope.numPerPage;
              if(lrcount == 0) return;

              $scope.totalLrItems = lrcount -1 ; //需要减掉0x0
              console.log( 'start getAllLrData = ' + lrcount);
              // for(var i=0; i<$scope.numPerPage; i++) {
              //
              //     LRService.getLr(lrcount- (curItemNum + i), function (e, id) {
              //         console.log(" lr = " + id + " e  = ", e);
              //         getLrData(id, function (lrd) {
              //
              //             lrd.id = id;
              //             out.push(lrd);
              //             console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
              //         })
              //     }).call();
              // }
              // 不好处理异步返回数据的先后，所以用苯办法做6次，不用numperPage来循环
              var index = $scope.totalLrItems - curItemNum;
              //0:
              LRService.getLr(index, function (e, id) {
                  console.log(" lr = " + id + " e  = ", e);
                  getLrData(id, function (lrd) {

                      lrd.id = id;
                      out[0]= lrd;
                      console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                  })
              }).call();

              // 1:
              if(index - 1>=0) {
                  LRService.getLr(index - 1, function (e, id) {
                      console.log(" lr = " + id + " e  = ", e);
                      getLrData(id, function (lrd) {

                          lrd.id = id;
                          out[1] = lrd;
                          console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                      })
                  }).call();
              }

              // 2:
              if(index - 2>=0) {
                  LRService.getLr(index - 2, function (e, id) {
                      console.log(" lr = " + id + " e  = ", e);
                      getLrData(id, function (lrd) {

                          lrd.id = id;
                          out[2] = lrd;
                          console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                      })
                  }).call();
              }

              // 3:
              if(index - 3>=0) {
                  LRService.getLr(index - 3, function (e, id) {
                      console.log(" lr = " + id + " e  = ", e);
                      getLrData(id, function (lrd) {

                          lrd.id = id;
                          out[3] = lrd;
                          console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                      })
                  }).call();
              }

              // 4:
              if(index - 4>=0) {
                  LRService.getLr(index - 4, function (e, id) {
                      console.log(" lr = " + id + " e  = ", e);
                      getLrData(id, function (lrd) {

                          lrd.id = id;
                          out[4] = lrd;
                          console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                      })
                  }).call();
              }

              // 5:
              if(index - 5>=0) {
                  LRService.getLr(index - 5, function (e, id) {
                      console.log(" lr = " + id + " e  = ", e);
                      getLrData(id, function (lrd) {

                          lrd.id = id;
                          out[5] = lrd;
                          console.log(" lrr = " + JSON.stringify(lrd) + "out." + out.length);
                      })
                  }).call();
              }

              if($scope.getLrTimer)
                $interval.cancel($scope.getLrTimer);
              $scope.getLrTimer = $interval( function () {
                  if (angular.isUndefined(out[0])
                      || (angular.isUndefined(out[1]) && (index - 1>=0))
                      || (angular.isUndefined(out[2]) && (index - 2>=0))
                      || (angular.isUndefined(out[3]) && (index - 3>=0))
                      || (angular.isUndefined(out[4]) && (index - 4>=0))
                      || (angular.isUndefined(out[5]) &&(index - 5>=0)) ) {
                      // 继续，啥也不干等待
                      console.log("getLrTimer");
                  } else {
                      //更新相关状态
                      $interval.cancel($scope.getLrTimer);
                      console.log("getLrTimer", out);
                      cb(out);
                  }
              }, 300);
          }).call();

      };

      // 根据id获取数据
      var getLrData = function (id, cb) {
// 循环获取，直到所有的都返回 {
          var out = {};
          console.log('start init');
          // 当前用户是否为借贷人
          LRService.getBorrower(id, function (e, borrower) {
              console.log('init, getBorrower = ' + borrower);
              out.Borrower = borrower;
              $scope.IamBorrower = Web3Service.coinbase == borrower;
              // $scope.IamBorrower = true;
              console.log('$scope.IamBorrower = ' + $scope.IamBorrower + 'Web3Service.coinbase = ' + Web3Service.coinbase);
          }).call();

          // 获取当前借贷状态
          LRService.getState(id, function (e, state) {
              console.log('init, getState = ' + state);
              out.State = state;
              out.strState = getStatusStr(state);
              console.log('init, strState = ' + out.strState);
          }).call();

          // 获取当前借贷状态
          LRService.getWantedWei(id, function (e, WantedWei) {
              console.log('init, getWantedWei = ' + WantedWei);

              out.WantedWei = WantedWei;
          }).call();

          // 获取当前借贷状态
          LRService.getPremiumWei(id, function (e, PremiumWei) {
              console.log('init, getPremiumWei = ' + PremiumWei);
              out.PremiumWei = PremiumWei;
          }).call();

          // 获取当前借贷状态
          LRService.getTokenName(id, function (e, TokenName) {
              console.log('init, getTokenName = ' + TokenName);
              out.TokenName = TokenName;
          }).call();

          // 获取当前借贷状态
          LRService.getTokenSmartcontractAddress(id, function (e, TokenSmartcontractAddress) {
              console.log('init, getTokenSmartcontractAddress = ' + TokenSmartcontractAddress);
              if(TokenSmartcontractAddress == '0x0000000000000000000000000000000000000000')
                  out.TokenSmartcontractAddress = '';
              else
                  out.TokenSmartcontractAddress = TokenSmartcontractAddress;
          }).call();

          // 获取当前借贷状态
          LRService.getTokenInfoLink(id, function (e, TokenInfoLink) {
              console.log('init, getTokenInfoLink = ' + TokenInfoLink);
              out.TokenInfoLink = TokenInfoLink;
          }).call();

          LRService.getDaysToLen(id, function (e, DaysToLen) {
              console.log('init, getDaysToLen = ' + DaysToLen);
              out.DaysToLen = DaysToLen;
          }).call();

          LRService.getLender(id, function (e, Lender) {
              console.log('init, getLender = ' + Lender);
              if(Lender == '0x0000000000000000000000000000000000000000')
                  out.Lender = '';
              else
                  out.Lender = Lender;
              $scope.IamLender = Web3Service.coinbase == Lender;
          }).call();

          LRService.getTokenAmount(id, function (e, TokenAmount) {
              console.log('init, getTokenAmount = ' + TokenAmount);
              out.TokenAmount = TokenAmount;
          }).call();

          LRService.isRep(id, function (e, isRep) {
              console.log('init, isRep = ' + isRep);
              out.isRep = isRep;
          }).call();


          $scope.timer[id] = $interval( function () {
              // console.log("timer start");
              //循环检测是否已经获取所有数据，如果都有取消定时器
              if(angular.isUndefined(out.WantedWei) || angular.isUndefined(out.PremiumWei) || angular.isUndefined(out.TokenName)
                  || angular.isUndefined(out.TokenInfoLink) || angular.isUndefined(out.TokenSmartcontractAddress)
                  || angular.isUndefined(out.Borrower) || angular.isUndefined(out.DaysToLen) || angular.isUndefined(out.State)
                  || angular.isUndefined(out.Lender) || angular.isUndefined(out.TokenAmount)) {
                  // 继续，啥也不干等待
                  // console.log("nothing");
              } else {
                  //更新相关状态
                  $interval.cancel($scope.timer[id]);
                  cb(out);
              }
          }, 10);
      };




    });
  }
)();
