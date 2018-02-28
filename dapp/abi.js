var abiJSON = {
  "token": {
    "abi": [{"inputs": [], "constant": true, "name": "name", "payable": false, "outputs": [{"type": "string", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "spender"}, {"type": "uint256", "name": "value"}], "constant": false, "name": "approve", "payable": false, "outputs": [{"type": "bool", "name": "success"}], "type": "function"}, {"inputs": [], "constant": true, "name": "totalSupply", "payable": false, "outputs": [{"type": "uint256", "name": "supply"}], "type": "function"}, {"inputs": [{"type": "address", "name": "from"}, {"type": "address", "name": "to"}, {"type": "uint256", "name": "value"}], "constant": false, "name": "transferFrom", "payable": false, "outputs": [{"type": "bool", "name": "success"}], "type": "function"}, {"inputs": [], "constant": true, "name": "decimals", "payable": false, "outputs": [{"type": "uint8", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "owner"}], "constant": true, "name": "balanceOf", "payable": false, "outputs": [{"type": "uint256", "name": "balance"}], "type": "function"}, {"inputs": [], "constant": true, "name": "symbol", "payable": false, "outputs": [{"type": "string", "name": ""}], "type": "function"}, {"inputs": [{"type": "address", "name": "to"}, {"type": "uint256", "name": "value"}], "constant": false, "name": "transfer", "payable": false, "outputs": [{"type": "bool", "name": "success"}], "type": "function"}, {"inputs": [{"type": "address", "name": "owner"}, {"type": "address", "name": "spender"}], "constant": true, "name": "allowance", "payable": false, "outputs": [{"type": "uint256", "name": "remaining"}], "type": "function"}, {"inputs": [{"indexed": true, "type": "address", "name": "from"}, {"indexed": true, "type": "address", "name": "to"}, {"indexed": false, "type": "uint256", "name": "value"}], "type": "event", "name": "Transfer", "anonymous": false}, {"inputs": [{"indexed": true, "type": "address", "name": "owner"}, {"indexed": true, "type": "address", "name": "spender"}, {"indexed": false, "type": "uint256", "name": "value"}], "type": "event", "name": "Approval", "anonymous": false}]
  },
  "LoanLedger" : {
      "abi": [
          {
              "constant": true,
              "inputs": [],
              "name": "mainAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "index",
                      "type": "uint256"
                  }
              ],
              "name": "getLr",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "index",
                      "type": "uint256"
                  }
              ],
              "name": "getLrFunded",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "potentialBorrower",
                      "type": "address"
                  },
                  {
                      "name": "weiSum",
                      "type": "uint256"
                  }
              ],
              "name": "addCreditTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "potentialBorrower",
                      "type": "address"
                  },
                  {
                      "name": "weiSum",
                      "type": "uint256"
                  }
              ],
              "name": "lockCreditTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "a",
                      "type": "address"
                  },
                  {
                      "name": "index",
                      "type": "uint256"
                  }
              ],
              "name": "getLrForUser",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "potentialBorrower",
                      "type": "address"
                  }
              ],
              "name": "burnCreditTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "potentialBorrower",
                      "type": "address"
                  },
                  {
                      "name": "weiSum",
                      "type": "uint256"
                  }
              ],
              "name": "unlockCreditTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "totalLrCount",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getLrCount",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "whereToSendFee",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "collateralType",
                      "type": "int256"
                  }
              ],
              "name": "newLr",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "createNewLendingRequest",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "a",
                      "type": "address"
                  }
              ],
              "name": "getLrCountForUser",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "borrowerFeeAmount",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "createNewLendingRequestRep",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getLrFundedCount",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getCreditTokenAddress",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "potentialBorrower",
                      "type": "address"
                  },
                  {
                      "name": "weiSum",
                      "type": "uint256"
                  }
              ],
              "name": "approveCreditTokens",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "creditTokenAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getFeeSum",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "name": "whereToSendFee_",
                      "type": "address"
                  },
                  {
                      "name": "creditTokenAddress_",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
          }
      ],
  },
  "LR" : {
      "abi": [
          {
              "constant": true,
              "inputs": [],
              "name": "currentType",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint8"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "creator",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "new_",
                      "type": "address"
                  }
              ],
              "name": "changeMainAddress",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "currentState",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint8"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "mainAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "registrarAddress",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "lenderFeeAmount",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getState",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint8"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "token_smartcontract_address",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getBorrower",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getTokenSmartcontractAddress",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "token_infolink",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "new_",
                      "type": "address"
                  }
              ],
              "name": "changeLoanLedgerAddress",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "waitingForPayback",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "premium_wei",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getNeededSumByBorrower",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "token_amount",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "waitingForLender",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getDaysToLen",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getTokenAmount",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "checkTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "isRep",
              "outputs": [
                  {
                      "name": "out",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "wanted_wei",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "borrower",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getTokenInfoLink",
              "outputs": [
                  {
                      "name": "out",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getTokenName",
              "outputs": [
                  {
                      "name": "out",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "token_name",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getLender",
              "outputs": [
                  {
                      "name": "out",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "cancell",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "whereToSendFee",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getWantedWei",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getNeededSumByLender",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "lender",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "start",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "days_to_lend",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "wanted_wei_",
                      "type": "uint256"
                  },
                  {
                      "name": "token_amount_",
                      "type": "uint256"
                  },
                  {
                      "name": "premium_wei_",
                      "type": "uint256"
                  },
                  {
                      "name": "token_name_",
                      "type": "string"
                  },
                  {
                      "name": "token_infolink_",
                      "type": "string"
                  },
                  {
                      "name": "token_smartcontract_address_",
                      "type": "address"
                  },
                  {
                      "name": "days_to_lend_",
                      "type": "uint256"
                  }
              ],
              "name": "setData",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "requestDefault",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "getPremiumWei",
              "outputs": [
                  {
                      "name": "out",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [],
              "name": "returnTokens",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "inputs": [
                  {
                      "name": "mainAddress_",
                      "type": "address"
                  },
                  {
                      "name": "borrower_",
                      "type": "address"
                  },
                  {
                      "name": "whereToSendFee_",
                      "type": "address"
                  },
                  {
                      "name": "contractType",
                      "type": "int256"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
          }
      ]
  },
  "CreditToken" : {
      "abi": [
          {
              "constant": true,
              "inputs": [],
              "name": "creator",
              "outputs": [
                  {
                      "name": "",
                      "type": "address"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "forAddress",
                      "type": "address"
                  }
              ],
              "name": "nonLockedTokensCount",
              "outputs": [
                  {
                      "name": "tokenCount",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "_spender",
                      "type": "address"
                  },
                  {
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "approve",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                  {
                      "name": "supplyOut",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  },
                  {
                      "name": "",
                      "type": "address"
                  },
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "transferFrom",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "decimals",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "allSupply",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "forAddress",
                      "type": "address"
                  },
                  {
                      "name": "tokenCount",
                      "type": "uint256"
                  }
              ],
              "name": "issueTokens",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address"
                  }
              ],
              "name": "balanceOf",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "newCreator",
                      "type": "address"
                  }
              ],
              "name": "changeCreator",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [],
              "name": "symbol",
              "outputs": [
                  {
                      "name": "",
                      "type": "string"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "forAddress",
                      "type": "address"
                  },
                  {
                      "name": "tokenCount",
                      "type": "uint256"
                  }
              ],
              "name": "unlockTokens",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address"
                  }
              ],
              "name": "lockedOf",
              "outputs": [
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "",
                      "type": "address"
                  },
                  {
                      "name": "",
                      "type": "uint256"
                  }
              ],
              "name": "transfer",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "forAddress",
                      "type": "address"
                  },
                  {
                      "name": "tokenCount",
                      "type": "uint256"
                  }
              ],
              "name": "lockTokens",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": false,
              "inputs": [
                  {
                      "name": "forAddress",
                      "type": "address"
                  }
              ],
              "name": "burnTokens",
              "outputs": [
                  {
                      "name": "success",
                      "type": "bool"
                  }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
          },
          {
              "constant": true,
              "inputs": [
                  {
                      "name": "_owner",
                      "type": "address"
                  },
                  {
                      "name": "_spender",
                      "type": "address"
                  }
              ],
              "name": "allowance",
              "outputs": [
                  {
                      "name": "remaining",
                      "type": "uint256"
                  }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
          },
          {
              "inputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "constructor"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "name": "_from",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "name": "_to",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "Transfer",
              "type": "event"
          },
          {
              "anonymous": false,
              "inputs": [
                  {
                      "indexed": true,
                      "name": "_owner",
                      "type": "address"
                  },
                  {
                      "indexed": true,
                      "name": "_spender",
                      "type": "address"
                  },
                  {
                      "indexed": false,
                      "name": "_value",
                      "type": "uint256"
                  }
              ],
              "name": "Approval",
              "type": "event"
          }
      ]
  },
    "STK" : {
        "abi": [
            {
                "constant": true,
                "inputs": [],
                "name": "creator",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "supplyOut",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "allSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "forAddress",
                        "type": "address"
                    },
                    {
                        "name": "tokenCount",
                        "type": "uint256"
                    }
                ],
                "name": "issueTokens",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "remaining",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            }
        ],
    }
};
