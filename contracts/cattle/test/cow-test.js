var Cow = artifacts.require("./Cow.sol");
var Straw = artifacts.require("./Straw.sol");
var BigNumber = require("bignumber.js");


const increaseTime = (addSeconds) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [addSeconds], id: 0
    }, () => {resolve()});
  })
}

contract('Cow', function(accounts) {
  let cow;
  let straw;
  before(() => {
    return Cow.deployed().then((_cow) => {
      cow = _cow;
    }).then(() => {
      return Straw.deployed();
    }).then((_straw) => {
        straw = _straw;
    }).then(() => {
      return increaseTime(60);
    });
  });
  it("should get the token uri", () => {
    return cow.tokenURI(0).then((tokenURI) => {
      assert.equal(tokenURI, "https://cryptocattle.xyz/metadata/cow/0")
    });
  })
  it("transfer a token", () => {
    return cow.transferFrom(accounts[0], accounts[1], 0).then(() =>{
      return cow.balanceOf(accounts[1]).then((count) => {
        assert.equal(count, 1);
      })
    })
  })
  it("create a straw", () => {
    let strawId;
    return cow.balanceOf(accounts[1]).then((count) => {
      if(count != 1) {
        return cow.transferFrom(accounts[0], accounts[1], 0)
      }
    }).then(() => {
      return cow.nextStraw(0);
    }).then((result) => {
      let strawTime = result[0];
      strawId = result[1];
      return increaseTime(50*60*60);
    }).then(() => {
      return straw.frozen(strawId);
    }).then((frozen) => {
      assert.ok(!frozen);
      return straw.freeze(strawId, {from: accounts[1]});
    }).then(() => {
      return straw.frozen(strawId);
    }).then((frozen) => {
      assert.ok(frozen);
      return cow.nextStraw(0)
    }).then((results) => {
      assert.equal(results[1].toNumber(), parseInt(strawId) + 1);
    })
  });
  it("moof a cow", () => {
    let strawId1;
    let strawId2;
    return increaseTime(50*60*60).then(() => {
      return cow.transferFrom(accounts[0], accounts[2], 1)
    }).then(() => {
      console.log("A");
      console.log(accounts);
      return cow.transferFrom(accounts[0], accounts[2], 2)
    }).then((x) => {
      console.log(x);
      // assert.ok(false);
      console.log("B");
      return Promise.all([
        cow.ownerOf(1).then(console.log),
        cow.ownerOf(2).then(console.log),
      ])
    }).then(() => {
      return increaseTime(50*60*60);
    }).then(() => {
      console.log("C")
      return Promise.all([
        straw.tokenOfOwnerByIndex(accounts[2], 0),
        straw.tokenOfOwnerByIndex(accounts[2], 1),
      ]);
    }).then((results) => {
      console.log("D", results)
      strawId1 = results[0];
      strawId2 = results[1];
      return cow.moof(strawId1, strawId2, {from: accounts[2]})
    }).then((tx) => {
      return cow.ownerOf(tx.logs[1].args.tokenid)
    }).then((owner) => {
      assert.equal(owner, accounts[2]);
      return cow
    })
  });
})
