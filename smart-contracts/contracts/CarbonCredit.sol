// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

/**
 * @title CarbonCredit
 * @dev ERC-1155 Tokenized Blue Carbon Credit for KarbonShrunkhala MRV platform.
 * 1 Token = 1 tCO2e (metric ton of CO2 equivalent verified sequestration).
 */
contract CarbonCredit is ERC1155, AccessControl, ERC1155Supply, ERC1155URIStorage {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    string public name = "KarbonShrunkhala Blue Carbon Credit";
    string public symbol = "KBCC";

    event CreditMinted(
        address indexed recipient,
        uint256 indexed tokenId,
        uint256 amount,
        string ipfsUri
    );

    event CreditRetired(
        address indexed account,
        uint256 indexed tokenId,
        uint256 amount,
        string retirementReason
    );

    constructor(address admin) ERC1155("https://gateway.pinata.cloud/ipfs/{id}.json") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(VERIFIER_ROLE, admin);
    }

    /**
     * @dev Mints tokenized Blue Carbon credits for a verified project.
     * @param to Account receiving the credits (NGO project owner).
     * @param tokenId Unique token ID representing project batch.
     * @param amount Amount of carbon credits (1 token = 1 tCO2e).
     * @param ipfsUri IPFS URI pointing to immutable metadata (GeoJSON + GEE Telemetry).
     */
    function mintCredit(
        address to,
        uint256 tokenId,
        uint256 amount,
        string memory ipfsUri
    ) external onlyRole(MINTER_ROLE) {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        _mint(to, tokenId, amount, "");
        _setURI(tokenId, ipfsUri);

        emit CreditMinted(to, tokenId, amount, ipfsUri);
    }

    /**
     * @dev Retire (burn) carbon credits for ESG compliance.
     */
    function retire(
        uint256 tokenId,
        uint256 amount,
        string memory reason
    ) external {
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient credit balance");
        _burn(msg.sender, tokenId, amount);
        emit CreditRetired(msg.sender, tokenId, amount, reason);
    }

    // Required Overrides for OpenZeppelin v5
    function uri(uint256 tokenId)
        public
        view
        override(ERC1155, ERC1155URIStorage)
        returns (string memory)
    {
        return ERC1155URIStorage.uri(tokenId);
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
