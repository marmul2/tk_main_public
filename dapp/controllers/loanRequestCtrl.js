(
  function () {
    angular
    .module("tokenLoan")
    .controller("loanRequestCtrl", function ($interval, $scope, $routeParams, Web3Service, LRService, Utils,$location) {
        console.log('loanRequestCtrl');
        $scope.state = 0;
        $scope.IamBorrower = false; //判断自己是否是借贷人
        $scope.IamLender = false;
        $scope.tipText = '';
        $scope.btnDisabled = false;
        $scope.inputDisabled = true;
        $scope.loading = true;

        // $scope.lr={
        //     WantedWei: 0,  // 需要的币
        //     PremiumWei: 0, // 需要的利息，
        //     TokenName: '', //token名字
        //     TokenInfoLink: '', //token信息链接
        //     TokenSmartContractAddress: '',
        //     Borrower: 'aaaaaaaaaaa',
        //     DaysToLen: 0,
        //     State: 0,
        //     Lender: 'zzzzzzzzzzzzz',
        //     TokenAmount: 0,
        //     isEns: false,
        //     isRep: false,
        //     EnsDomainHash: '',
        //     NeededSumByBorrower: 0
        // };

        // 合约请求id或地址，通过参数传递过来 need todo
        $scope.lrid = $routeParams.id;


        $scope.testTokenAmount = 0;

        //
        // setTimeout(function () {
        //     $scope.onTestSendToken('0x5bfd0a1595131785efcc5d0122e11057c9e7855c', 50000);
        // }, 1000);



        // 测试发送
        $scope.onTestSendToken = function (contractAddress, testTokenAmount) {
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
                            console.log(" balanceof = " + result);
                        });
                    }, 1000);
                });
            }

        };

        //根据参数地址(当前借贷id)获取数据


        // 当按钮点击时
        $scope.onClicked = function () {
            if($scope.state == 0  && $scope.IamBorrower) {
                // 设置数据  wei to eth bugnumber need todo
                var out = {};
                out.ethamount = $scope.lr.WantedWei;
                out.days      =  $scope.lr.DaysToLen;
                out.premium   = $scope.lr.PremiumWei;
                out.bor       =  $scope.lr.Borrower;
                out.len       = $scope.lr.Lender;

                out.tokamount = $scope.lr.TokenAmount   || 0;
                out.tokname   = $scope.lr.TokenName    || '';
                out.smart     = $scope.lr.TokenSmartcontractAddress || 0;
                out.link      = $scope.lr.TokenInfoLink || '';

                out.ensDomainHash = $scope.lr.ensDomain || 0;

                console.log("set data start ", out);
                LRService.setData($scope.lrid, out, function (e, result) {
                    console.log("set data" + result + " error = " + e);
                    if(result) {
                        Utils.success("设置数据成功");
                        $location.path('/');
                    }
                });

            }else if($scope.state == 1 && $scope.IamBorrower) {
                //发送抵押货币
                LRService.transferTokens($scope.lrid, function (e, result) {
                    console.log("transferTokens" + result + " error = " + e);
                    if(result) {
                        Utils.success("发送抵押货币成功");
                        $location.path('/');
                    }
                });
            } else if($scope.state == 3 && !$scope.IamBorrower) {
                //我要贷币
                LRService.lenderPay($scope.lrid, $scope.NeededSumByLender, function (e, result) {
                    console.log("lenderPay " + result + " error = " + e);
                    if(result) {
                        Utils.success("贷币成功");
                        $location.path('/');
                    }
                });
            } else if($scope.state == 3 && $scope.IamBorrower) {
                // 取消
                LRService.borrowerCancel($scope.lrid, function (e, result) {
                    console.log("borrowerCancel " + result + " error = " + e);
                    if(result) {
                        Utils.success("取消成功");
                        $location.path('/');
                    }

                });
            } else if($scope.state == 4 && $scope.IamBorrower) {
                //还币
                LRService.returnTokens($scope.lrid, $scope.NeededSumByBorrower, function (e, result) {
                    console.log("returnTokens " + result + " error = " + e);
                    if(result) {
                        Utils.success("还币成功");
                        $location.path('/');
                    }
                });
            } else if($scope.state == 4 && $scope.IamLender) {
                //    抵押结束，取抵押物
                LRService.getTokens($scope.lrid, function (e, result) {
                    console.log("getTokens " + result + " error = " + e);
                    if(result) {
                        Utils.success("抵押结束，取抵押物成功");
                        $location.path('/');
                    }
                });
            }
        };


        function getNeededSumByLender() {
            LRService.getNeededSumByLender($scope.lrid, function (e, result) {
                console.log("getNeededSumByLender = " + result);
                $scope.NeededSumByLender = result;
                getNeededSumByBorrower();
            }).call();
        }

        function getNeededSumByBorrower() {
            LRService.getNeededSumByBorrower($scope.lrid, function (e, result) {
                console.log("getNeededSumByBorrower = " + result);
                $scope.NeededSumByBorrower = result;
                getFeeSum();
            }).call();
        }

        function getFeeSum() {
            LRService.getFeeSum(function (e, result) {
                console.log("getFeeSum = " + result);
                $scope.feeSum = result;
                getDetail();
            }).call();
        }

        function init() {
            getNeededSumByLender();
        }

        function getDetail() {
            // 循环获取，直到所有的都返回 {
            var out = {};
            console.log('start init');
            // 当前用户是否为借贷人
            LRService.getBorrower($scope.lrid, function (e, borrower) {
                console.log('init, getBorrower = ' + borrower);
                out.Borrower = borrower;
                $scope.IamBorrower = Web3Service.coinbase == borrower;
                // $scope.IamBorrower = true;
                console.log('$scope.IamBorrower = ' + $scope.IamBorrower + 'Web3Service.coinbase = ' + Web3Service.coinbase);
                //获取rep
                LRService.getRepTokenAddress(function (e, repAddr) {
                    console.log('init, getRepTokenAddress = ' + repAddr);
                    LRService.getRepBalance(repAddr, borrower, function (e, result) {
                        console.log('init, getRepBalance = ' + result);
                        $scope.repBalance = result;
                    }).call();
                }).call();
            }).call();

            // 获取当前借贷状态
            LRService.getState($scope.lrid, function (e, state) {
                console.log('init, getState = ' + state);
                // out.State = 3;
                out.State = state;
            }).call();

            // 获取当前借贷状态
            LRService.getWantedWei($scope.lrid, function (e, WantedWei) {
                console.log('init, getState = ' + WantedWei);
                out.WantedWei = WantedWei;
            }).call();

            // 获取利息
            LRService.getPremiumWei($scope.lrid, function (e, PremiumWei) {
                console.log('init, getPremiumWei = ' + PremiumWei);
                out.PremiumWei = PremiumWei;
            }).call();

            // 获取当前借贷状态
            LRService.getTokenName($scope.lrid, function (e, TokenName) {
                console.log('init, getTokenName = ' + TokenName);
                out.TokenName = TokenName;
            }).call();

            // 获取抵押币合约地址
            LRService.getTokenSmartcontractAddress($scope.lrid, function (e, TokenSmartcontractAddress) {
                console.log('init, getTokenSmartcontractAddress = ' + TokenSmartcontractAddress);
                if(TokenSmartcontractAddress == '0x0000000000000000000000000000000000000000')
                    out.TokenSmartcontractAddress = '';
                else
                    out.TokenSmartcontractAddress = TokenSmartcontractAddress;

            }).call();

            // 获取当前借贷状态
            LRService.getTokenInfoLink($scope.lrid, function (e, TokenInfoLink) {
                console.log('init, getTokenInfoLink = ' + TokenInfoLink);
                out.TokenInfoLink = TokenInfoLink;
            }).call();

            LRService.getDaysToLen($scope.lrid, function (e, DaysToLen) {
                console.log('init, getDaysToLen = ' + DaysToLen);
                out.DaysToLen = DaysToLen;
            }).call();

            LRService.getLender($scope.lrid, function (e, Lender) {
                console.log('init, getLender = ' + Lender);
                if(Lender == '0x0000000000000000000000000000000000000000')
                    out.Lender = '';
                else
                    out.Lender = Lender;
                $scope.IamLender = Web3Service.coinbase == Lender;
                // $scope.IamLender = true;
            }).call();

            LRService.getTokenAmount($scope.lrid, function (e, TokenAmount) {
                console.log('init, getTokenAmount = ' + TokenAmount);
                out.TokenAmount = TokenAmount;
            }).call();

            LRService.isRep($scope.lrid, function (e, isRep) {
                console.log('init, isRep = ' + isRep);
                out.isRep = isRep;
            }).call();


            $scope.timer = $interval( function () {
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
                    $interval.cancel($scope.timer);
                    $scope.lr = out;
                    $scope.state = out.State;
                    // $scope.state = 4;
                    updateTipText();
                    // console.log("start update");
                    $scope.loading = false;
                }
            }, 100);


        }

        $scope.$on('destory', function () {
            if($scope.timer) {
                $interval.cancel($scope.timer);
            }
        });

        // 根据状态获取提示文本
        function updateTipText() {
          if($scope.state == 0 && $scope.IamBorrower) {
              $scope.tipText = '请完善借贷需求数据';
              $scope.btnText = '设置数据';
              $scope.inputDisabled = false;
              $scope.btnDisabled = false;
          } else if($scope.state == 0 && !$scope.IamBorrower) {
              $scope.tipText = '借币人还未完善借贷需求数据';
              $scope.btnText = '设置数据';
              $scope.btnDisabled = true;
              $scope.inputDisabled = true;
              console.log("$scope.btnDisabled  = " + $scope.btnDisabled  + " $scope.inputDisabled =" +$scope.inputDisabled);
          } else if($scope.state == 1 && $scope.IamBorrower) {
              $scope.tipText = '请发送' + $scope.lr.TokenAmount + '个抵押货币'+  '到借贷请求的地址' + $scope.lrid;
              $scope.btnText = '检查抵押币是否已经发送';
              $scope.btnDisabled = false;
          } else if($scope.state == 1 && !$scope.IamBorrower) {
              $scope.tipText = '借币人需要发送' + $scope.lr.TokenAmount + '个抵押货币'+ '到借贷请求的地址' + $scope.lrid;
              $scope.btnText = '检查抵押币是否已经发送';
              $scope.btnDisabled = true;
          } else if($scope.state == 3 && !$scope.IamBorrower) {
              $scope.tipText = '给借币人贷币，并且获取利息回报';
              $scope.btnText = '我要贷币';
              $scope.btnDisabled = false;
          } else if($scope.state == 3 && $scope.IamBorrower) {
              $scope.tipText = '请等待出借方接受你的借贷请求，你也能够取消这次借贷请求';
              $scope.btnText = '取消';
          } else if($scope.state == 4 && $scope.IamBorrower) {
              $scope.tipText = '如果需要还币, 请发送' + getEtherFromat($scope.NeededSumByBorrower) + 'Eth(包括' + getEtherFromat($scope.lr.PremiumWei) + 'Eth利息) 到' + $scope.lrid +', 还清以后借币人将获取' + getEtherFromat($scope.lr.WantedWei) + '信用积分';
              $scope.btnText = '还币';
              $scope.btnDisabled = false;
          } else if($scope.state == 4 && !$scope.IamBorrower && !$scope.IamLender) {
              $scope.tipText = '借币人应该返还' + getEtherFromat($scope.NeededSumByBorrower) + 'Eth后才能拿到抵押物';
              $scope.btnText = '还币';
              $scope.btnDisabled = true;
          } else if($scope.state == 4 && $scope.IamLender) {
              $scope.tipText = '如果这次交易到期但是借方并没有还币，你能够获取他的抵押币，并将扣除借方的积分';
              $scope.btnText = '获取抵押币';
              $scope.btnDisabled = false;
          }
        }

        var getEtherFromat = function(num) {
           return new Web3().toBigNumber(num).div('1e18').toPrecision(2).toString();
        };



        setTimeout(function () {
            init();
        },100);

    });
  }
)();
