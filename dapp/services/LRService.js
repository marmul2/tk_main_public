(
  function () {
    angular
    .module('tokenLoan')
    .service('LRService', function ($rootScope, Utils, Web3Service) {




      var loanRequest = {
          json : abiJSON,
          // WantedWei: 0,  // 需要的币
          // PremiumWei: 0, // 需要的利息，
          // TokenName: '', //token名字
          // TokenInfoLink: '', //token信息链接
          // TokenSmartContractAddress: '',
          // Borrower: '',
          // DaysToLen: 0,
          // State: 0,
          // Lender: '',
          // TokenAmount: 0,
          // isEns: false,
          // isRep: false,
          // EnsDomainHash: ''

      };
        // 测试发币
        loanRequest.createSTK = function (cb) {
            console.log( 'Web3Service.coinbase  = ' + Web3Service.coinbase);
            var instance = Web3Service.web3.eth.contract(loanRequest.json.STK.abi).at(txDefault.STKContractAddress);

             instance.issueTokens(Web3Service.coinbase , 2000000000, { from: Web3Service.coinbase , gas: 4000000 }, cb );
        };

        loanRequest.getBalance = function(contractAddress, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.STK.abi).at(txDefault.STKContractAddress);
            loanRequest.callRequest(
                instance.balanceOf,
                [contractAddress],
                cb
            ).call();
        };

        //测试给我的帐户充点币
        loanRequest.sendToken = function (contractAddress, token_count, cb) {
            var params   = { from: Web3Service.coinbase, gas: 2000000 };
            var instance = Web3Service.web3.eth.contract(loanRequest.json.STK.abi).at(txDefault.STKContractAddress);
            // instance.transfer('0x11E4d919CA98a97CA81c512C38a537B6A17FEdF2'
            //       stSendToken('0xf17f52151EbEF6C7334FAD080c5704D77216b732', 5000);, token_count, params, cb);
            instance.transfer(contractAddress, token_count, params, cb);

        };
        /**
         * Return eth_call request object.
         * custom method .call() for direct calling.
         */
        loanRequest.callRequest = function (method, params, cb) {

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


        // 新建借贷请求
        loanRequest.newLoanRequest = function (cb) {
            console.log('Web3Service.coinbase = ' + Web3Service.coinbase + " txDefault.loanEthMainAddress =" + txDefault.loanEthMainAddress + " default = " + Web3Service.web3.eth.defaultAccount);
            var tx = {
                from:Web3Service.coinbase,
                // gas: 2000000,
                // gasLimit: txDefault.gasLimit,
                gasPrice:15000000000,
                value: 10000000000000000
            };
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            instance.createNewLendingRequest.sendTransaction(tx, cb);

        };

        // 新建信用借贷请求
        loanRequest.newLoanRequestRep = function (cb) {
            var tx = {
                from:Web3Service.coinbase,
                gasPrice:15000000000,
                value: 10000000000000000
            };
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            instance.createNewLendingRequestRep.sendTransaction(tx, cb);
        };

        // 获取信用合约地址
        loanRequest.getRepTokenAddress = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getCreditTokenAddress,
                [],
                cb
            );
        };

        // 获取token的数量
        loanRequest.getRepBalance = function (repAddress, owner, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.CreditToken.abi).at(repAddress);
            return loanRequest.callRequest(
                instance.balanceOf,
                [owner],
                cb
            );
        };

        loanRequest.getLrCount = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getLrCount,
                [],
                cb
            );
        };

        loanRequest.getLr = function (index, cb) {
            console.log(" service loanRequest.getLr start " + index);
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getLr,
                [index],
                cb
            );
        };

        loanRequest.getLrCountForUser = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getLrCountForUser,
                [],
                cb
            );
        };

        loanRequest.getLrForUser = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getLrForUser,
                [],
                cb
            );
        };

        loanRequest.getLrFundedCount = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getLrFundedCount,
                [],
                cb
            );
        };

        loanRequest.getLrFunded = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getNeededSumByBorrower,
                [],
                cb
            );
        };


        loanRequest.getNeededSumByLender = function(address, cb ) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getNeededSumByLender,
                [],
                cb
            );
        };

        loanRequest.getNeededSumByBorrower = function(address, cb ) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getNeededSumByBorrower,
                [],
                cb
            );
        };

        loanRequest.getFeeSum = function (cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LoanLedger.abi).at(txDefault.loanEthMainAddress);
            return loanRequest.callRequest(
                instance.getFeeSum,
                [],
                cb
            );
        };

        loanRequest.getWantedWei =function(address, cb) {
           var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);

           // Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address).getWantedWei.call({}, function (error, result) {
           //     console.log("test getWantedWei = " + result + "  error=" + error);
           //     cb(result);
           // });
           return loanRequest.callRequest(
               instance.getWantedWei,
               [],
               cb
           );
        };

        loanRequest.getTokenName =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getTokenName,
                [],
                cb
            );
        };

        loanRequest.getPremiumWei =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getPremiumWei,
                [],
                cb
            );
        };

        loanRequest.getTokenInfoLink =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getTokenInfoLink,
                [],
                cb
            );
        };

        loanRequest.getTokenSmartcontractAddress =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getTokenSmartcontractAddress,
                [],
                cb
            );
        };
        loanRequest.getBorrower =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getBorrower,
                [],
                cb
            );
        };

        loanRequest.getDaysToLen =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getDaysToLen,
                [],
                cb
            );
        };

        loanRequest.getState =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getState,
                [],
                cb
            );
        };

        loanRequest.getLender =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getLender,
                [],
                cb
            );
        };

        loanRequest.getTokenAmount =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.getTokenAmount,
                [],
                cb
            );
        };


        loanRequest.isRep =function(address, cb) {
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            return loanRequest.callRequest(
                instance.isRep,
                [],
                cb
            );
        };


       // 设置数据
        loanRequest.setData = function (address, lr, cb) {
            // need todo
            // 参数
            //    out.ethamount,
            //     out.tokamount,
            //     out.premium,
            //     out.tokname,
            //     out.link,
            //     out.smart,
            //     out.days,
            //     out.ensDomainHash,

            console.log(" data = " + new Web3().toBigNumber(lr.ethamount).mul('1e18') + " premium" + new Web3().toBigNumber(lr.premium).mul('1e18') + " tokamount =" + new Web3().toBigNumber(lr.tokamount) );
            // var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            // console.log("instance = ",instance);
            //
            // var result = instance['setData'].apply(instance, [new Web3().toBigNumber(lr.ethamount).mul('1e18'), new Web3().toBigNumber(lr.tokamount), new Web3().toBigNumber(lr.premium).mul('1e18'), lr.tokname, lr.link, lr.smart, lr.days, lr.ensDomainHash],);
            // console.log("result = " + result);
            // cb();

            var tx = {
                from:Web3Service.coinbase,
                gasPrice:8000000000
            };
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            instance.setData.sendTransaction(
                new Web3().toBigNumber(lr.ethamount).mul('1e18'),
                new Web3().toBigNumber(lr.tokamount),
                new Web3().toBigNumber(lr.premium).mul('1e18'),
                lr.tokname,
                lr.link,
                lr.smart,
                lr.days,
                tx,
                cb);

        };

       // 出借方发送币
        loanRequest.lenderPay = function (to, NeededSumByLender, cb) {
        //调用发送交易
          var transact = {
              gasPrice: 20000000000,
              from:  Web3Service.coinbase,
              to:    to,
              value: NeededSumByLender
          };

          console.log('to = ' + to + " defaultAccount = " + Web3Service.coinbase);

        //     var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
        //     Web3Service.sendTransaction(
        //         Web3Service.web3.eth,
        //         [
        //             transact
        //         ],
        //         { onlySimulate: false },
        //         cb
        //     );
            Web3Service.web3.eth.sendTransaction(transact, cb);
        };

        // 借方取消借贷
        loanRequest.borrowerCancel = function (address, cb) {
            //返还token
            // lr.returnTokens(state.get(\address)) goto-success-cb
            // var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            // return loanRequest.callRequest(
            //     instance.returnTokens,
            //     [],
            //     cb
            // );
            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            instance.returnTokens.sendTransaction({},{from:  Web3Service.coinbase},cb);
        };

        // 借方发送token
        loanRequest.transferTokens = function (address, cb) {

            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            instance.checkTokens.sendTransaction({},{from:  Web3Service.coinbase},cb);
        };

        //借方还币
        loanRequest.returnTokens = function (to, NeededSumByBorrower, cb) {

            console.log('NeededSumByBorrower = ', new Web3().toBigNumber(NeededSumByBorrower).toNumber() );
            // var value = new Web3().toBigNumber(new Web3().toBigNumber(NeededSumByBorrower).toNumber() + 200000000000000000);
            var transact = {
                // gasPrice: 20000000000,
                gasPrice:20000000000,
                from:  Web3Service.coinbase,
                to:    to,
                value: NeededSumByBorrower
            };

            Web3Service.web3.eth.sendTransaction(transact, cb);

        };

        // 到期取抵押tokens
        loanRequest.getTokens = function (address, cb) {
            // lr.requestDefault(state.get(\address)) goto-success-cb
            // var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            // return loanRequest.callRequest(
            //     instance.requestDefault,
            //     [],
            //     cb
            // );

            var instance = Web3Service.web3.eth.contract(loanRequest.json.LR.abi).at(address);
            instance.requestDefault.sendTransaction({},{from:  Web3Service.coinbase},cb);
        };




       return loanRequest;
    });
  }
)();
