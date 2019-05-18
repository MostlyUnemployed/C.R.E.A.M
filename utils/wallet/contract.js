module.exports = {
  creamFactory: {
    address: '0x5727dcbf8829754e639bb9a3470b7965926a615f',
    abi: [
      {
        "constant": false,
        "inputs": [],
        "name": "deployCream",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "creams",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
  },
  cream: {
    abi: [
      {
        "constant": true,
        "inputs": [],
        "name": "WETH_ADDRESS",
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
            "name": "_kittyId",
            "type": "uint256"
          }
        ],
        "name": "meow",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "lick",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "weth",
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
        "name": "COMPOUND_ADDRESS",
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
        "name": "owner",
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
        "name": "compound",
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
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_me",
            "type": "address"
          }
        ],
        "name": "LogSomething",
        "type": "event"
      }
    ],
    bytecode: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073c778417e063141139fce010982780140aa0cd5ab600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507361bbd7bd5ee2a202d7e62519750170a52a8dfd45600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061084c8061010a6000396000f3fe608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063040141e51461008857806315cb9fa2146100df5780632a3220e61461010d5780633fc8cef314610148578063694c0eb91461019f5780638da5cb5b146101f6578063f69e20461461024d575b600080fd5b34801561009457600080fd5b5061009d6102a4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61010b600480360360208110156100f557600080fd5b81019080803590602001909291905050506102bc565b005b34801561011957600080fd5b506101466004803603602081101561013057600080fd5b8101908080359060200190929190505050610624565b005b34801561015457600080fd5b5061015d610797565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ab57600080fd5b506101b46107bd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561020257600080fd5b5061020b6107d5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561025957600080fd5b506102626107fa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73c778417e063141139fce010982780140aa0cd5ab81565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561031757600080fd5b6000600360008381526020019081526020016000205414151561033957600080fd5b60003411151561034857600080fd5b346003600083815260200190815260200160002081905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163461c35090604051806000019050600060405180830381858888f193505050503d80600081146103e5576040519150601f19603f3d011682016040523d82523d6000602084013e6103ea565b606091505b505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b37361bbd7bd5ee2a202d7e62519750170a52a8dfd45346040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156104c657600080fd5b505af11580156104da573d6000803e3d6000fd5b505050506040513d60208110156104f057600080fd5b8101908080519060200190929190505050151561050c57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f2b9fdb873c778417e063141139fce010982780140aa0cd5ab346040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1580156105e557600080fd5b505af11580156105f9573d6000803e3d6000fd5b505050506040513d602081101561060f57600080fd5b81019080805190602001909291905050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561067f57600080fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663f3fef3a373c778417e063141139fce010982780140aa0cd5ab836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561075857600080fd5b505af115801561076c573d6000803e3d6000fd5b505050506040513d602081101561078257600080fd5b81019080805190602001909291905050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7361bbd7bd5ee2a202d7e62519750170a52a8dfd4581565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea165627a7a7230582080c93ceb143728e5532607c170e8cd67f3342659c8c66fd405a05778c56fe5790029'
  }
}