// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public notRevealedUri;
  uint256 public cost = 0.07 ether;
  uint256 public costPre = 0.05 ether;
  uint256 public maxSupply = 10000;
  uint256 public maxMintAmount = 3;
  bool public paused = true;
  bool public revealed = false;
  // WHITELIST
  uint256 public nftPerAddressLimit = 3;
  bool public onlyWhitelisted = true;
  address[] public whitelistedAddresses;
  mapping(address => uint256) public addressMintedBalance;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI,
    string memory _initNotRevealedUri
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    setNotRevealedURI(_initNotRevealedUri);
  }

  // set Initial baseURI from IPFS
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // mints NFTs
  function mint(uint256 _mintAmount) public payable {
    require(!paused, "Contract is currentely paused!");
    uint256 supply = totalSupply();
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(_mintAmount <= maxMintAmount, "max mint amount per session exceeded");
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

    if (msg.sender != owner()) {
        if(onlyWhitelisted == true) {
            require(isWhitelisted(msg.sender), "user is not whitelisted");
            uint256 ownerMintedCount = addressMintedBalance[msg.sender];
            require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
            require(msg.value >= costPre * _mintAmount, "insufficient funds");
        }else {
            require(msg.value >= cost * _mintAmount, "insufficient funds");
        }
    }
    
    for (uint256 i = 1; i <= _mintAmount; i++) {
        addressMintedBalance[msg.sender]++;
      _safeMint(msg.sender, supply + i);
    }
  }

  function airDrop(uint[] calldata quantity, address[] calldata recipient) external onlyOwner{
    require(quantity.length == recipient.length, "Provide quantities and recipients" );
    
    uint256 totalQuantity;
    uint256 supply = totalSupply();

    for(uint i = 0; i < quantity.length; ++i){
      totalQuantity += quantity[i];
    }

    require(supply + totalQuantity + 1 <= maxSupply, "Not enough supply!" );

    for(uint i = 0; i < recipient.length; ++i){
      for(uint j = 0; j < quantity[i]; ++j){
          _mint(recipient[i], supply + 1);
          supply++;
      }
    }
  }

  // returns how many tokens in wallet of owner
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  // return data of NFT Tokens
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    if(revealed == false) {
        return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  // set project revealed
  function changeStateRevealed(bool _state) public onlyOwner {
      revealed = _state;
  }

  // change costs
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  function setCostPre(uint256 _newCost) public onlyOwner {
    costPre = _newCost;
  }

  // change maxSupply value
  function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
    maxSupply = _newMaxSupply;
  }
  
  // change max mint amount
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  // change or set the inital notRevealedURI from IPFS
  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  // change or set the baseURI from IPFS
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  // change base extension, now is ".json"
  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  // change the paused state of contract, initializing true
  function changeStatePaused(bool _state) public onlyOwner {
    paused = _state;
  }
 
  // take withdraw
  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

  // WHITELIST //

  // returns all addresses addeded on whitelist
  function isWhitelisted(address _user) public view returns (bool) {
    for (uint i = 0; i < whitelistedAddresses.length; i++) {
      if (whitelistedAddresses[i] == _user) {
          return true;
      }
    }
    return false;
  }

  // change nft per address limit 
  function setNftPerAddressLimit(uint256 _limit) public onlyOwner {
    nftPerAddressLimit = _limit;
  }
    
  // change state of presale contract
  function setOnlyWhitelisted(bool _state) public onlyOwner {
    onlyWhitelisted = _state;
  }
  
  // Add Users on Whitelist
  function setWhitelistUsers(address[] calldata _users) public onlyOwner {
    delete whitelistedAddresses;
    whitelistedAddresses = _users;
  }
}
