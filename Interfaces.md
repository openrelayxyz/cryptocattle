# Contract

CryptoCattle will involve two ERC721 contracts using the Metadata and Enumerable
extensions, along with some custom methods.

## Common

To enumerate the tokens owned by a particular account:

* Get Token Count: `balanceOf(owner)`
* Get owner's token by index: `tokenOfOwnerByIndex(owner, index)` - where `0 <= index < balanceOf(owner)` - This will return the tokenId
* Get token metadata URI `tokenURI(tokenId)`
* Get token metadata by making an HTTP GET request to the URI returned above. URIs will be HTTP(s) URLs, no other protocols for this project
* Set approvals for trading: `setApprovalForAll(operator, bool)`
  * `operator`: 0x ERC721 asset proxy. For Kovan, this is `0x2a9127c745688a165106c11cd4d647d2220af821`
  * `bool`: `true` to enable trading, `false` to disable trading
* If we want to transfer items without trades (which we haven't discussed), that would be: `safeTransferFrom(from, to, tokenId)`.

## Straws
* `freeze(tokenId)` - Called to commit tokenId to storage, and enable the cow to generate new straws.

## Cows
* `moof(strawTokenId, strawTokenId)` - Burns two straws and moofs a new cow into existence
  * Emits an event - `Moof(indexed owner, tokenId)`
* `nextStraw(tokenId)` - Unix timestamp of the next straw. 0 if

## 0x

* We should use the 0x forwarding contract so buyers can submit ETH without
  wrapping, approvals.
* Possibly use https://0x.org/instant
* If we want more flexibility, we can use `@0x/asset-buyer` - https://0x.org/docs/asset-buyer#introduction

# HTTP Interfaces

* Token Metadata: URL from `tokenURI(tokenId)`. Payload:

Cows (Example):
(Something like https://cryptocattle.xyz/metadata/cow/1000)

```
{
  "description": "A $personality_type cow",
  "image": "https://cryptocattle.xyz/images/cow/1000.svg",
  "attributes": [
    {"trait_type": "generation", "value": 0},
    {"trait_type": "moofactory_period", "value": 43200},
    {"trait_type": "personality_type", "value": "friendly"},
    {"trait_type": "strength", "value": 0},
    {"trait_type": "dexterity", "value": 0},
    {"trait_type": "constitution", "value": 0},
    {"trait_type": "intelligence", "value": 0},
    {"trait_type": "wisdom", "value": 0},
    {"trait_type": "charisma", "value": 0},
  ]
}
```

Trait values go 1 - 20 with a standard distribution from an 8 bit mapping

(Something like https://cryptocattle.xyz/metadata/straw/100000001)
Straw:
```
{
  "image": "https://cryptocattle.xyz/images/straw/100000001.svg",
  "attributes": [
    {"trait_type": "frozen", "value": true},
    {"trait_type": "parentId", "value": 1000},
  ]
}
```

## JavaScript Tools

OpenRelay has some JavaScript tools for:

* Creating and Signing Orders
* Signing the Terms of Service

The latest versions are not yet uploaded to NPM, but can be installed from Git:

https://github.com/openrelayxyz/widgets.git branch `erc721-widgets` folder `packages/utilities`

This can then be imported as

`@openrelay/element-utilities`

## Creating and uploading orders

To create an order:

```
let UnsignedOrder = require("@openrelay/element-utilities/unsignedorder.js");

let order = new UnsignedOrder({
    exchangeAddress: exchangeAddress, // 0x35dd2932454449b14cee11a94d3674a936d5d7b2 for kovan
    expirationTimeSeconds: parseInt(new Date().getTime() / 1000) + (10*24*60*60), // Listed for 10 days
    feeRecipientAddress: feeRecipientAddress, // 0x74430e1338613b5a9166032cfd8f8f0a717bac67
    makerAddress: account, // The owner of the token being offered
    makerAssetAmount: 1,
    makerAssetData: `0x02571792000000000000000000000000${address.slice(2)}${this.idToHex(this.tokenId)}`, // address = token address, tokenId = token being offered
    makerFee: 0,
    salt: parseInt(new Date().getTime() / 1000),
    senderAddress: "0x0000000000000000000000000000000000000000",
    takerAddress: "0x0000000000000000000000000000000000000000",
    takerAssetAmount: askingPrice, // In base units (wei)
    takerAssetData: `0xf47261b0000000000000000000000000${wethAddress.slice(2)}`, // 0xd0a1e359811322d97991e03f863a0c30c2cf029c for kovan
    takerFee: 0,
});
```

Post JSON order to `https://api.openrelay.xyz/v2/order_config`, it will return with

```
let orderConfig = {
    "senderAddress": "0x0000000000000000000000000000000000000000",
    "feeRecipientAddress": "0x74430e1338613b5a9166032cfd8f8f0a717bac67",
    "makerFee": "100000000000000",
    "takerFee": "200000000000000"
}
```

Then set:

```
order.takerFee = toBigNumber(orderConfig.makerFee).plus(orderConfig.takerFee);
```

To sign:

```
let Signer = require("@openrelay/element-utilities/signing.js");

let signer = new Signer(web3, account);

signer.signMessage(order.hash).then((signature) => {
  order.signature = signature;
})
```

At that point, the JSON order can be posted to https://api.openrelay.xyz/v2/order

The order should appear in the orderbook moments later.

Orders will be rejected if the maker has not signed the terms of use:

```
let Terms = require("@openrelay/element-utilities/terms.js");

let terms = new Terms("https://api.openrelay.xyz/", web3.currentProvider);

terms.signAndUpload(address).then((success) => {
  // Success is true if upload succeeded
})
```

You can test if a person has previously signed the terms of use:

```
terms.authorized(address).then((ok) => {
  //
})
```

## Getting orders from the orderbook

Make an HTTP request to:

https://api.openrelay.xyz/v2/orders?makerAssetAddress=TOKEN_ADDRESS&networkId=42

To filter by current owner address add:

  &makerAddress=USER_ADDRESS

Response will look something like:

```
{
  "total": 1,
  "page": 1,
  "perPage": 1,
  "records": [
    {
      "order": {
        "makerAddress": "0x324454186bb728a3ea55750e0618ff1b18ce6cf8",
        "takerAddress": "0x0000000000000000000000000000000000000000",
        "makerAssetData": "0x02571792000000000000000000000000dde19c145c1ee51b48f7a28e8df125da0cc440be0000000000000000000000000000000000000000000000000000000000000001",
        "takerAssetData": "0xf47261b0000000000000000000000000d0a1e359811322d97991e03f863a0c30c2cf029c",
        "feeRecipientAddress": "0xc22d5b2951db72b44cfb8089bb8cd374a3c354ea",
        "exchangeAddress": "0x35dd2932454449b14cee11a94d3674a936d5d7b2",
        "senderAddress": "0x0000000000000000000000000000000000000000",
        "makerAssetAmount": "1",
        "takerAssetAmount": "100000000000000000",
        "makerFee": "0",
        "takerFee": "500000000000000000",
        "expirationTimeSeconds": "1551034659",
        "salt": "0",
        "signature": "0x1b5e880a51242c016341c8dba1330550480735186a35b6f4ac947929b1820564d718ecc6ed291a8cac81fb1919077c68cce9574806e1ef326cf9942621c588932003"
      },
      "metaData": {
        "hash": "0x5d514461197786b1b1496cb8e384e3558afc4b2dc7d70a5cc6034cd3dca1d838",
        "feeRate": 5,
        "status": 0,
        "takerAssetAmountRemaining": "100000000000000000",
        "makerAssetMetadata": {
          "raw_metadata": "{\"description\":\"A big cow\",\"external_url\":\"https://blog.openrelay.xyz/assets/data/cow.html\",\"image\":\"https://blog.openrelay.xyz/assets/data/cow.jpeg\",\"name\":\"Angus\",\"attributes\":{\"base\":\"cow\",\"level\":5,\"weight\":500,\"generation\":0}}",
          "token_uri": "https://blog.openrelay.xyz/assets/data/cow.json",
          "name": "Angus",
          "external_url": "https://blog.openrelay.xyz/assets/data/cow.html",
          "image": "https://blog.openrelay.xyz/assets/data/cow.jpeg",
          "description": "A big cow",
          "attributes": [
            {
              "name": "base",
              "type": "string",
              "value": "cow"
            },
            {
              "name": "generation",
              "type": "number",
              "value": "0.000000"
            },
            {
              "name": "level",
              "type": "number",
              "value": "5.000000"
            },
            {
              "name": "weight",
              "type": "number",
              "value": "500.000000"
            }
          ],
          "raw_attributes": "{\"base\":\"cow\",\"generation\":0,\"level\":5,\"weight\":500}"
        }
      }
    }
  ]
}
```

`records[0].metadata.makerAssetMetadata.token_uri` is what you'd get from `contract.tokenURI(tokenId)`
`records[0].metadata.makerAssetMetadata.raw_metadata` is what you'd get by requesting the above token URI
`records[0].metadata.makerAssetMetadata.image` Will be the URL of the picture to display



# Intracontract methods

These are contract methods that the contracts will use between eachother, but
probably won't be called by the frontend


## Common
* `burn(tokenId)` - Delete an item. The cows contract will have permission to burn straws, otherwise owners may burn items.

## Cow
* `currentStrawId(cow)` - Returns strawId of a cow - if 0, the cow does not have pending straws
* `parent0(cow)` - Returns the first parent tokenId
* `parent1(cow)` - Returns the second parent tokenId
* `moofactoryPeriod(cow)` - Time between straw creation in seconds
