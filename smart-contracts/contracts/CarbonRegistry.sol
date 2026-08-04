// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CarbonRegistry
 * @dev On-chain registry for verified Blue Carbon restoration projects.
 */
contract CarbonRegistry is AccessControl {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    struct RegisteredProject {
        string projectId;
        address ownerAddress;
        string projectName;
        string ecosystemType;
        uint256 areaHectares;
        string ipfsMetadataCid;
        bool isVerified;
        uint256 verifiedAt;
    }

    mapping(string => RegisteredProject) public projects;
    string[] public projectIds;

    event ProjectRegistered(
        string indexed projectId,
        address indexed owner,
        string ipfsMetadataCid,
        uint256 areaHectares
    );

    event ProjectVerifiedOnChain(
        string indexed projectId,
        address indexed verifier,
        uint256 timestamp
    );

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(VERIFIER_ROLE, admin);
    }

    function registerProject(
        string memory projectId,
        address ownerAddress,
        string memory projectName,
        string memory ecosystemType,
        uint256 areaHectares,
        string memory ipfsMetadataCid
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(projects[projectId].projectId).length == 0, "Project already registered");

        projects[projectId] = RegisteredProject({
            projectId: projectId,
            ownerAddress: ownerAddress,
            projectName: projectName,
            ecosystemType: ecosystemType,
            areaHectares: areaHectares,
            ipfsMetadataCid: ipfsMetadataCid,
            isVerified: false,
            verifiedAt: 0
        });

        projectIds.push(projectId);
        emit ProjectRegistered(projectId, ownerAddress, ipfsMetadataCid, areaHectares);
    }

    function recordVerification(string memory projectId) external onlyRole(VERIFIER_ROLE) {
        require(bytes(projects[projectId].projectId).length > 0, "Project not found");
        
        projects[projectId].isVerified = true;
        projects[projectId].verifiedAt = block.timestamp;

        emit ProjectVerifiedOnChain(projectId, msg.sender, block.timestamp);
    }

    function getProject(string memory projectId) external view returns (RegisteredProject memory) {
        return projects[projectId];
    }
}
