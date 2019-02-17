pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

interface ICow {
  function nextStraw(uint256) external view returns (uint256, uint256);
  function generatedStraw(uint256) external;
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function ownerOf(uint256) external view returns (address);
  function tokenOfOwnerByIndex(address, uint256) external view returns (uint256);
  function tokenByIndex(uint256) external view returns (uint256);
  function getMoofactoryPeriod(uint256 tokenId) external view returns (uint256);
}

contract Straw is ERC721Full, Ownable {
  using SafeMath for uint256;
  ICow cows;
  string public baseURI;
  event Debug(uint256 number);
  event Debug(address value);
  constructor (string memory name, string memory symbol, address cowContract) public ERC721Full(name, symbol) Ownable() {
    cows = ICow(cowContract);
  }
  function setBaseURI(string memory _baseURI) public onlyOwner {
    baseURI = _baseURI;
  }
  function tokenURI(uint256 tokenId) external view returns (string memory) {
    require(_exists(tokenId));
    return string(abi.encodePacked(baseURI, uint2str(tokenId)));
  }
  // This will be higher than the actual total supply, because some cows will
  // be in their moofactory period.
  function totalSupply() public view returns (uint256) {
    return super.totalSupply().add(cows.totalSupply());
  }

  function balanceOf(address _owner) public view returns (uint256) {
    uint count = super.balanceOf(_owner);
    for(uint i=0; i < cows.balanceOf(_owner); i++) {
      uint timestamp;
      uint number;
      (timestamp, number) = cows.nextStraw(cows.tokenOfOwnerByIndex(_owner, i));
      if(timestamp > block.timestamp) {
        count += 1;
      }
    }
    return count;
  }
  function ownerOf(uint256 tokenId) public view returns (address) {
    if(super._exists(tokenId)) {
      return super.ownerOf(tokenId);
    }
    uint cowid = parent(tokenId);
    uint timestamp;
    uint number;
    (timestamp, number) = cows.nextStraw(cowid);
    require(timestamp < block.timestamp, "STRAW_NOT_FORMED");
    require(number == strawNumber(tokenId), "NOT_NEXT_STRAW");
    return cows.ownerOf(cowid);
  }
  function tokenOfOwnerByIndex(address _owner, uint256 index) public view returns (uint256) {
    uint balance = super.balanceOf(_owner);
    if(index < balance) {
      return super.tokenOfOwnerByIndex(_owner, index);
    }
    uint remaining = index - balance + 1;
    for(uint i=0; i < cows.balanceOf(_owner); i++) {
      uint timestamp;
      uint number;
      uint cowid = cows.tokenOfOwnerByIndex(_owner, i);
      (timestamp, number) = cows.nextStraw(cowid);
      if(timestamp < block.timestamp) {
        remaining -= 1;
      }
      if(remaining == 0) {
        return (cowid << 128 ) + number;
      }
    }
    require(false, "INDEX_ERROR_STRAW");
  }
  function tokenByIndex(uint256 index) public view returns (uint256) {
    // This makes a best effort to find a straw at the given index, but there
    // may be gaps where no straw exists.
    if(index < super.totalSupply()) {
      return super.tokenByIndex(index);
    }
    uint256 offset = index - super.totalSupply();
    uint timestamp;
    uint number;
    uint cowid = cows.tokenByIndex(offset);
    (timestamp, number) = cows.nextStraw(cowid);
    require(timestamp < block.timestamp);
    return cowid << 128 + number;
  }

  function _transferFrom(address from, address to, uint256 tokenId) internal {
    if(!super._exists(tokenId)) {
      freeze(tokenId);
    }
    super._transferFrom(from, to, tokenId);
  }

  function frozen(uint256 tokenId) public view returns (bool) {
    return super._exists(tokenId);
  }

  function freeze(uint256 tokenId) public {
    require(ownerOf(tokenId) == msg.sender, "WRONG_OWNER");
    uint timestamp;
    uint number;
    (timestamp, number) = cows.nextStraw(parent(tokenId));
    _mint(msg.sender, tokenId);
    cows.generatedStraw(parent(tokenId));
  }

  function burn(uint256 tokenId) public {
    address _owner = ownerOf(tokenId);
    if(!super._exists(tokenId)) {
      _mint(ownerOf(tokenId), tokenId);
    }
    require(_isApprovedOrOwner(msg.sender, tokenId) || msg.sender == address(cows), "BURN_BAD_SENDER");
    _burn(_owner, tokenId);
  }

  function mintStraw(uint256 cowId) external onlyOwner {
    uint timestamp;
    uint number;
    (timestamp, number) = cows.nextStraw(cowId);
    _mint(msg.sender, (cowId << 128) + number);
    cows.generatedStraw(cowId);
  }

  function parent(uint256 tokenId) public pure returns (uint256) {
    return tokenId >> 128;
  }
  function strawNumber(uint256 tokenId) internal pure returns (uint256) {
    return tokenId & (2^128 - 1);
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
