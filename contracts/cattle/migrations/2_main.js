var Cow = artifacts.require("./Cow.sol");
var Straw = artifacts.require("./Straw.sol");

// module.exports = function(deployer) {
//   deployer.deploy(Cow, "Crypto Cattle", "CCOW", 60, 100);
//   deployer.deploy(Cow, "Crypto Cattle", "CCOW", 60, 100);
// };


module.exports = async function(deployer, network, accounts) {
  deployer.then(async () => {
    cow = await deployer.deploy(Cow, "Crypto Cattle", "CCOW", 300, 5000);
    straw = await deployer.deploy(Straw, "Crypto Cattle Breeding Straws", "CCSTRAW", cow.address);
    await cow.setStraws(Straw.address);
    await cow.setBaseURI("https://cryptocattle.xyz/metadata/cow/")
    await straw.setBaseURI("https://cryptocattle.xyz/metadata/straw/")
  });
}
