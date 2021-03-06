abi = [
{
  "constant": True,
  "inputs": [
    {
      "name": "interfaceId",
      "type": "bytes4"
    }
  ],
  "name": "supportsInterface",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x01ffc9a7"
},
{
  "constant": True,
  "inputs": [],
  "name": "name",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x06fdde03"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "getApproved",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x081812fc"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "approve",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x095ea7b3"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "from",
      "type": "address"
    },
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "transferFrom",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x23b872dd"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "from",
      "type": "address"
    },
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "safeTransferFrom",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x42842e0e"
},
{
  "constant": True,
  "inputs": [],
  "name": "baseURI",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x6c0360eb"
},
{
  "constant": False,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x715018a6"
},
{
  "constant": True,
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x8da5cb5b"
},
{
  "constant": True,
  "inputs": [],
  "name": "isOwner",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x8f32d59b"
},
{
  "constant": True,
  "inputs": [],
  "name": "symbol",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x95d89b41"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "approved",
      "type": "bool"
    }
  ],
  "name": "setApprovalForAll",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xa22cb465"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "from",
      "type": "address"
    },
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "name": "_data",
      "type": "bytes"
    }
  ],
  "name": "safeTransferFrom",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xb88d4fde"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "owner",
      "type": "address"
    },
    {
      "name": "operator",
      "type": "address"
    }
  ],
  "name": "isApprovedForAll",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xe985e9c5"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xf2fde38b"
},
{
  "inputs": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "symbol",
      "type": "string"
    },
    {
      "name": "cowContract",
      "type": "address"
    }
  ],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "constructor",
  "signature": "constructor"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": False,
      "name": "number",
      "type": "uint256"
    }
  ],
  "name": "Debug",
  "type": "event",
  "signature": "0x8a36f5a234186d446e36a7df36ace663a05a580d9bea2dd899c6dd76a075d5fa"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": False,
      "name": "value",
      "type": "address"
    }
  ],
  "name": "Debug",
  "type": "event",
  "signature": "0x330da4cde831ccab151372275307c2f0cce2bcce846635cd66e6908f10d20363"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": True,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event",
  "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": True,
      "name": "from",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "to",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "Transfer",
  "type": "event",
  "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": True,
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "approved",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "Approval",
  "type": "event",
  "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
},
{
  "anonymous": False,
  "inputs": [
    {
      "indexed": True,
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": True,
      "name": "operator",
      "type": "address"
    },
    {
      "indexed": False,
      "name": "approved",
      "type": "bool"
    }
  ],
  "name": "ApprovalForAll",
  "type": "event",
  "signature": "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "_baseURI",
      "type": "string"
    }
  ],
  "name": "setBaseURI",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x55f804b3"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "tokenURI",
  "outputs": [
    {
      "name": "",
      "type": "string"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xc87b56dd"
},
{
  "constant": True,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x18160ddd"
},
{
  "constant": True,
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
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x70a08231"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "ownerOf",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x6352211e"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name": "index",
      "type": "uint256"
    }
  ],
  "name": "tokenOfOwnerByIndex",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x2f745c59"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "index",
      "type": "uint256"
    }
  ],
  "name": "tokenByIndex",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0x4f6ccce7"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "frozen",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": False,
  "stateMutability": "view",
  "type": "function",
  "signature": "0xe9ac0440"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "freeze",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0xd7a78db8"
},
{
  "constant": False,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "burn",
  "outputs": [],
  "payable": False,
  "stateMutability": "nonpayable",
  "type": "function",
  "signature": "0x42966c68"
},
{
  "constant": True,
  "inputs": [
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "parent",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": False,
  "stateMutability": "pure",
  "type": "function",
  "signature": "0x4eaa9d22"
}
]
