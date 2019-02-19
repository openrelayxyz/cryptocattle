pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

interface IStraw {
  function parent(uint256 tokenId) external view returns (uint256);
  function ownerOf(uint256 tokenId) external view returns (address);
  function burn(uint256 tokenId) external;
}

contract Cow is ERC721Full, Ownable {
  using SafeMath for uint256;

  string public baseURI;
  uint256 public startTime;
  uint256 public genZeroInterval;
  uint256 private genZeroLimit;
  uint256 private genZeroMateralizedCount;
  uint256 private genZeroEarliestUnmaterialized;
  uint256 private nextMoof;
  bool private materializing;
  uint256 constant MAX_UINT = 2**256 - 1;
  IStraw private straws;
  mapping (uint256 => bytes32) private dnaSequence;
  struct Pairing {
    uint256 parent0;
    uint256 parent1;
  }
  struct LastStraw {
    uint256 timestamp;
    uint256 counter;
  }
  mapping (uint256 => Pairing) private parents;
  mapping (uint256 => LastStraw) public lastStraw;
  mapping (uint256 => uint256) public generation;

  event Moof(address indexed owner, uint256 tokenid);
  // event Debug(bool value);
  // event Debug(uint256 value);

  constructor (string memory name, string memory symbol, uint256 _genZeroInterval, uint256 _genZeroLimit) public ERC721Full(name, symbol) Ownable() {
    // solhint-disable-previous-line no-empty-blocks
    startTime = block.timestamp;
    genZeroInterval = _genZeroInterval;
    genZeroLimit = _genZeroLimit;
    nextMoof = genZeroLimit + 1;
  }
  function setStraws(address _straws) public onlyOwner {
    require(address(straws) == address(0));
    straws = IStraw(_straws);
  }
  function setBaseURI(string memory _baseURI) public onlyOwner {
    baseURI = _baseURI;
  }
  function tokenURI(uint256 tokenId) external view returns (string memory) {
    require(_exists(tokenId));
    return string(abi.encodePacked(baseURI, uint2str(tokenId)));
  }
  function totalSupply() public view returns (uint256) {
    return super.totalSupply().add(genZeroCount()).sub(genZeroMateralizedCount);
  }
  function balanceOf(address _owner) public view returns (uint256) {
    if(_owner != owner()) {
      return super.balanceOf(_owner);
    } else {
      return genZeroCount().sub(genZeroMateralizedCount);
    }
  }
  function ownerOf(uint256 tokenId) public view returns (address) {
    if(super._exists(tokenId)) {
      return super.ownerOf(tokenId);
    }
    require(tokenId < genZeroCount());
    return owner();
  }
  function tokenOfOwnerByIndex(address _owner, uint256 index) public view returns (uint256) {
    if(_owner != owner()) {
      return super.tokenOfOwnerByIndex(_owner, index);
    } else {
      uint256 counter = 0;
      for(uint i=genZeroEarliestUnmaterialized; i < genZeroCount(); i++) {
        if(!super._exists(i)) {
          if(counter == index) {
            return i;
          }
          counter += 1;
        }
      }
    }
    require(false, "INDEX_ERROR_COW");
  }
  function tokenByIndex(uint256 index) public view returns (uint256) {
    require(index < totalSupply());
    if(index < super.totalSupply()) {
      return super.tokenByIndex(index);
    }
    uint256 target = index - super.totalSupply() + 1;
    for(uint i=genZeroEarliestUnmaterialized; i < genZeroCount(); i++) {
      if(!super._exists(i)) {
        target -= 1;
      }
      if(target == 0) {
        return i;
      }
    }
    require(false, "INDEX_OUT_OF_RANGE");
  }
  function getDNA(uint256 tokenId) public view returns (bytes32) {
    require(_exists(tokenId));
    if(tokenId < genZeroLimit) {
      return keccak256(abi.encodePacked(tokenId, startTime));
    }
    return dnaSequence[tokenId];
  }
  function blockTime() public view returns (uint256) {
    return block.timestamp;
  }

  function getMoofactoryPeriod(uint256 tokenId) public view returns (uint256) {
    // Get the least significant 17 bits as seconds, add 12 hours. Gives a range
    // of roughly 12 - 48 hours
    return (uint256(getDNA(tokenId)) & 131071) + 43200;
  }

  function moof(uint256 strawId1, uint256 strawId2) public {
    require(straws.ownerOf(strawId1) == msg.sender, "BAD_OWNERSHIP1");
    require(straws.ownerOf(strawId2) == msg.sender, "BAD_OWNERSHIP2");
    Pairing memory _parents = Pairing({parent0: straws.parent(strawId1), parent1: straws.parent(strawId2)});
    require(_parents.parent0 != _parents.parent1, "SAME_PARENT");
    uint256 mixer = uint256(keccak256(abi.encodePacked(strawId1, strawId2, _parents.parent0, _parents.parent1, startTime)));
    nextMoof += 1;
    _mint(msg.sender, nextMoof);
    dnaSequence[nextMoof] = bytes32((mixer & uint256(getDNA(_parents.parent0))) | ((mixer ^ MAX_UINT ) & uint256(getDNA(_parents.parent1))));
    generation[nextMoof] = (generation[_parents.parent0] > generation[_parents.parent0] ? generation[_parents.parent0] : generation[_parents.parent1]).add(1);
    emit Moof(msg.sender, nextMoof);
    straws.burn(strawId1);
    straws.burn(strawId2);
  }

  function generatedStraw(uint256 tokenId) public {
    require(msg.sender == address(straws), "WRONG_GENERATOR");
    lastStraw[tokenId].timestamp = block.timestamp;
    lastStraw[tokenId].counter = lastStraw[tokenId].counter.add(1);
  }

  function nextStraw(uint256 tokenId) public view returns (uint256, uint256) {
    return (lastStraw[tokenId].timestamp + getMoofactoryPeriod(tokenId), lastStraw[tokenId].counter + 1);
  }

  function _transferFrom(address from, address to, uint256 tokenId) internal {
    if(!super._exists(tokenId) && from == owner()) {
      _materialize(tokenId);
    }
    super._transferFrom(from, to, tokenId);
  }


  function _materialize(uint256 tokenId) internal {
    require(tokenId < genZeroCount() && !super._exists(tokenId));
    materializing = true;
    _mint(owner(), tokenId);
    materializing = false;
    lastStraw[tokenId] = LastStraw({timestamp: block.timestamp, counter: 0});
    genZeroMateralizedCount += 1;
    if(tokenId == genZeroEarliestUnmaterialized) {
      uint i = tokenId + 1;
      for(; i < genZeroCount(); i++) {
        if(!super._exists(i)) {
          break;
        }
      }
      genZeroEarliestUnmaterialized = i;
    }
  }
  function _exists(uint256 tokenId) internal view returns (bool) {
    return (super._exists(tokenId) || (!materializing && tokenId < genZeroCount()));
  }
  function genZeroCount() public view returns (uint256) {
    uint256 intervals = (block.timestamp - startTime) / genZeroInterval;
    if(intervals > genZeroLimit) {
      return genZeroLimit;
    }
    return intervals;
  }
  function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (_i != 0) {
        bstr[k--] = byte(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
  }
}


/*
Bits  (0 is least significant)
0:17 - moofactory period
*/
