/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BurstPoint, BurstPointInterface } from "../BurstPoint";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "beginGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "burstValue",
        type: "uint256",
      },
    ],
    name: "bet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "betLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "closeGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "escape",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getGameRecords",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "betAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "burstValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "escapeBlockNum",
            type: "uint256",
          },
          {
            internalType: "enum BRecordStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct BetRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "increasePerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiple",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerAdd",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526064600255600a6003556064600455600a60055534801561002457600080fd5b50600061002f6100c6565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506100816100c6565b6001600160a01b03166100926100ca565b6001600160a01b0316146100c15760405162461bcd60e51b81526004016100b8906100d9565b60405180910390fd5b61010e565b3390565b6000546001600160a01b031690565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b610f978061011d6000396000f3fe6080604052600436106100e75760003560e01c80636ffcc7191161008a5780638da5cb5b116100595780638da5cb5b14610216578063ad7a672f14610238578063b863bd371461024d578063f2fde38b1461026d576100e7565b80636ffcc719146101d1578063715018a6146101e45780637a2d5702146101f95780638c556c9214610201576100e7565b80632d6ef310116100c65780632d6ef3101461014e578063437a8ae61461016e578063466985f31461018357806354c1750b146101a3576100e7565b80629d95ab146100ec5780631fd1b14e1461011757806325a7650a1461012c575b600080fd5b3480156100f857600080fd5b5061010161028d565b60405161010e9190610f58565b60405180910390f35b34801561012357600080fd5b50610101610293565b34801561013857600080fd5b5061014c610147366004610cae565b610299565b005b34801561015a57600080fd5b5061014c610169366004610cae565b61037b565b34801561017a57600080fd5b50610101610619565b34801561018f57600080fd5b5061014c61019e366004610cae565b61061f565b3480156101af57600080fd5b506101c36101be366004610cae565b6106e7565b60405161010e929190610d59565b61014c6101df366004610cc6565b610882565b3480156101f057600080fd5b5061014c6109be565b61014c610a47565b34801561020d57600080fd5b50610101610a88565b34801561022257600080fd5b5061022b610a8e565b60405161010e9190610d45565b34801561024457600080fd5b50610101610a9d565b34801561025957600080fd5b50610101610268366004610cae565b610aa1565b34801561027957600080fd5b5061014c610288366004610c80565b610ae0565b60035481565b60045481565b6102a1610ba0565b6001600160a01b03166102b2610a8e565b6001600160a01b0316146102e15760405162461bcd60e51b81526004016102d890610f23565b60405180910390fd5b60408051600080825260208201909252906102fd61044c610aa1565b9050610307610ba4565b5060408051606081018252828152602080820185815260018385018190526000888152908352939093208251815592518051929384939092610350926002850192910190610bcf565b50604082015160038201805460ff1916600183600281111561036e57fe5b0217905550505050505050565b610383610ba0565b6001600160a01b0316610394610a8e565b6001600160a01b0316146103ba5760405162461bcd60e51b81526004016102d890610f23565b60045460035482010143116103e15760405162461bcd60e51b81526004016102d890610e82565b600081815260016020819052604090912090600382015460ff16600281111561040657fe5b146104235760405162461bcd60e51b81526004016102d890610de9565b8054600282018054604080516020808402820181019092528281526060939092909183018282801561047e57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610460575b5050505050905060005b815181101561060557610499610c34565b8460010160008484815181106104ab57fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206040518060800160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff16600281111561051a57fe5b600281111561052557fe5b9052509050600060018260600151600281111561053e57fe5b141561054f5750602081015161058f565b60028260600151600281111561056157fe5b141561058f57600254600554600354898560400151030302019050816020015181111561058f575060208101515b8481116105fb57600060025482846000015102816105a957fe5b0490508484815181106105b857fe5b60200260200101516001600160a01b03166108fc829081150290604051600060405180830381858888f193505050501580156105f8573d6000803e3d6000fd5b50505b5050600101610488565b505050600301805460ff1916600217905550565b60025481565b60035481014311801561063a57506004546003548201014311155b6106565760405162461bcd60e51b81526004016102d890610e57565b600081815260016020819052604090912090600382015460ff16600281111561067b57fe5b146106985760405162461bcd60e51b81526004016102d890610de9565b3360009081526001808301602052604090912090600382015460ff1660028111156106bf57fe5b146106dc5760405162461bcd60e51b81526004016102d890610eee565b436002909101555050565b6000818152600160209081526040918290206002810180548451818502810185019095528085526060948594859391929083018282801561075157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610733575b505050505090506060815167ffffffffffffffff8111801561077257600080fd5b506040519080825280602002602001820160405280156107ac57816020015b610799610c34565b8152602001906001900390816107915790505b50905060005b8251811015610876576107c3610c34565b8460010160008584815181106107d557fe5b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000206040518060800160405290816000820154815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff16600281111561084457fe5b600281111561084f57fe5b8152505090508083838151811061086257fe5b6020908102919091010152506001016107b2565b50909350915050915091565b600082815260016020819052604090912090600382015460ff1660028111156108a757fe5b1480156108b8575060035483014311155b80156108e4575033600090815260018201602052604081206003015460ff1660028111156108e257fe5b145b6109005760405162461bcd60e51b81526004016102d890610eac565b610908610c34565b6040518060800160405280348152602001848152602001600081526020016001600281111561093357fe5b90523360009081526001808501602090815260409283902084518155908401518183015591830151600280840191909155606084015160038401805495965086959193909260ff1990921691849081111561098a57fe5b0217905550505060029091018054600181018255600091825260209091200180546001600160a01b03191633179055505050565b6109c6610ba0565b6001600160a01b03166109d7610a8e565b6001600160a01b0316146109fd5760405162461bcd60e51b81526004016102d890610f23565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b610a4f610ba0565b6001600160a01b0316610a60610a8e565b6001600160a01b031614610a865760405162461bcd60e51b81526004016102d890610f23565b565b60055481565b6000546001600160a01b031690565b4790565b600081424433604051602001610ab993929190610d1d565b6040516020818303038152906040528051906020012060001c81610ad957fe5b0692915050565b610ae8610ba0565b6001600160a01b0316610af9610a8e565b6001600160a01b031614610b1f5760405162461bcd60e51b81526004016102d890610f23565b6001600160a01b038116610b455760405162461bcd60e51b81526004016102d890610e11565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6040518060600160405280600081526020016060815260200160006002811115610bca57fe5b905290565b828054828255906000526020600020908101928215610c24579160200282015b82811115610c2457825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190610bef565b50610c30929150610c61565b5090565b604051806080016040528060008152602001600081526020016000815260200160006002811115610bca57fe5b5b80821115610c305780546001600160a01b0319168155600101610c62565b600060208284031215610c91578081fd5b81356001600160a01b0381168114610ca7578182fd5b9392505050565b600060208284031215610cbf578081fd5b5035919050565b60008060408385031215610cd8578081fd5b50508035926020909101359150565b6000815183526020820151602084015260408201516040840152606082015160038110610d1057fe5b6060840152505060800190565b928352602083019190915260601b6bffffffffffffffffffffffff1916604082015260540190565b6001600160a01b0391909116815260200190565b604080825283519082018190526000906020906060840190828701845b82811015610d9b5781516001600160a01b031684529284019290840190600101610d76565b50505083810382850152808551610db28184610f58565b91508387019250845b81811015610ddc57610dce838551610ce7565b938501939250600101610dbb565b5090979650505050505050565b6020808252600e908201526d19d85b59481b9bdd081cdd185c9d60921b604082015260600190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b60208082526011908201527032b9b1b0b832903a34b6b29032b93937b960791b604082015260600190565b60208082526010908201526f31b637b9b2903a34b6b29032b93937b960811b604082015260600190565b60208082526022908201527f6265742074696d65206572726f72206f72206861766520616c72656164792062604082015261195d60f21b606082015260800190565b6020808252818101527f6974206973206e6f742072696768742073746174757320746f20657363617065604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b9081526020019056fea26469706673582212202285c16a24ae0b52c5d358dd1a69c104dcdc9fce5640a3b6575b152e6191ea2b64736f6c634300060c0033";

export class BurstPoint__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BurstPoint> {
    return super.deploy(overrides || {}) as Promise<BurstPoint>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BurstPoint {
    return super.attach(address) as BurstPoint;
  }
  connect(signer: Signer): BurstPoint__factory {
    return super.connect(signer) as BurstPoint__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BurstPointInterface {
    return new utils.Interface(_abi) as BurstPointInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BurstPoint {
    return new Contract(address, _abi, signerOrProvider) as BurstPoint;
  }
}
