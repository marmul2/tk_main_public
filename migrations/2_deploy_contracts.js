// const MultisigWalletWithDailyLimit = artifacts.require('MultiSigWalletWithDailyLimit.sol')
// const MultisigWalletWithoutDailyLimit = artifacts.require('MultiSigWallet.sol')
// const MultisigWalletFactory = artifacts.require('MultiSigWalletWithDailyLimitFactory.sol')

// const ENS = artifacts.require('ENS.sol');
const LoanLedger = artifacts.require('LoanLedger.sol');
const CreditToken = artifacts.require('CreditToken.sol');
// const TEST_TOKEN = artifacts.require('SampleToken.sol');

const CHASON_ADDRESS = '0x48c97887900765b742144e8b7e75114b1ebb1c90';

module.exports = deployer => {
  const args = process.argv.slice();
  // if (process.env.DEPLOY_FACTORY){
  //   deployer.deploy(MultisigWalletFactory)
  //   console.log("Factory with Daily Limit deployed")
  // } else if (args.length < 5) {
  //   console.error("Multisig with daily limit requires to pass owner " +
  //     "list, required confirmations and daily limit")
  // } else if (args.length < 6) {
  //   deployer.deploy(MultisigWalletWithoutDailyLimit, args[3].split(","), args[4])
  //   console.log("Wallet deployed")
  // } else {
  //   deployer.deploy(MultisigWalletWithDailyLimit, args[3].split(","), args[4], args[5])
  //   console.log("Wallet with Daily Limit deployed")
  // }
//    开始部署借贷合约

//    先部署信用合约，拿到地址给主地址用
//     deployer.deploy(ReputationToken);
//
//     //部署测试token合约
//     deployer.deploy(TEST_TOKEN);
    deployer.deploy(CreditToken).then(function() {
        return deployer.deploy(LoanLedger, CHASON_ADDRESS, CreditToken.address);
    });



};
