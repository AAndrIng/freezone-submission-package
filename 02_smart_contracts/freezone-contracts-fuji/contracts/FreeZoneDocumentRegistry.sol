// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FreeZoneDocumentRegistry
 * @notice Stores document hash attestations and operational reputation attestations.
 * @dev Documents are NOT stored on-chain. Only their hash and metadata are recorded.
 */
contract FreeZoneDocumentRegistry is Ownable {
    struct DocumentProof {
        bytes32 docHash;
        string companyId;
        string docType;
        address registeredBy;
        uint256 timestamp;
        bool isValid;
    }

    struct ReputationAttestation {
        string companyId;
        uint8 complianceScore;
        uint8 riskScore;
        uint8 trustScore;
        uint8 overallScore;
        address attestedBy;
        uint256 timestamp;
        bool exists;
    }

    mapping(bytes32 => DocumentProof) private documents;
    mapping(string => ReputationAttestation) private reputations;

    event DocumentRegistered(
        bytes32 indexed docHash,
        string indexed companyId,
        string docType,
        address indexed registeredBy,
        uint256 timestamp
    );

    event DocumentStatusChanged(
        bytes32 indexed docHash,
        bool isValid,
        uint256 timestamp
    );

    event ReputationUpdated(
        string indexed companyId,
        uint8 complianceScore,
        uint8 riskScore,
        uint8 trustScore,
        uint8 overallScore,
        address indexed attestedBy,
        uint256 timestamp
    );

    error DocumentAlreadyRegistered(bytes32 docHash);
    error DocumentNotFound(bytes32 docHash);
    error EmptyString();
    error InvalidScore();

    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerDocument(
        bytes32 docHash,
        string calldata companyId,
        string calldata docType
    ) external onlyOwner {
        if (docHash == bytes32(0)) revert DocumentNotFound(docHash);
        if (bytes(companyId).length == 0 || bytes(docType).length == 0) {
            revert EmptyString();
        }
        if (documents[docHash].timestamp != 0) {
            revert DocumentAlreadyRegistered(docHash);
        }

        documents[docHash] = DocumentProof({
            docHash: docHash,
            companyId: companyId,
            docType: docType,
            registeredBy: msg.sender,
            timestamp: block.timestamp,
            isValid: true
        });

        emit DocumentRegistered(
            docHash,
            companyId,
            docType,
            msg.sender,
            block.timestamp
        );
    }

    function setDocumentValidity(bytes32 docHash, bool isValid) external onlyOwner {
        if (documents[docHash].timestamp == 0) revert DocumentNotFound(docHash);

        documents[docHash].isValid = isValid;
        emit DocumentStatusChanged(docHash, isValid, block.timestamp);
    }

    function verifyDocument(bytes32 docHash)
        external
        view
        returns (
            bool isValid,
            uint256 timestamp,
            string memory companyId,
            string memory docType,
            address registeredBy
        )
    {
        DocumentProof memory proof = documents[docHash];

        return (
            proof.isValid,
            proof.timestamp,
            proof.companyId,
            proof.docType,
            proof.registeredBy
        );
    }

    function updateReputation(
        string calldata companyId,
        uint8 complianceScore,
        uint8 riskScore,
        uint8 trustScore,
        uint8 overallScore
    ) external onlyOwner {
        if (bytes(companyId).length == 0) revert EmptyString();

        if (
            complianceScore > 100 ||
            riskScore > 100 ||
            trustScore > 100 ||
            overallScore > 100
        ) {
            revert InvalidScore();
        }

        reputations[companyId] = ReputationAttestation({
            companyId: companyId,
            complianceScore: complianceScore,
            riskScore: riskScore,
            trustScore: trustScore,
            overallScore: overallScore,
            attestedBy: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit ReputationUpdated(
            companyId,
            complianceScore,
            riskScore,
            trustScore,
            overallScore,
            msg.sender,
            block.timestamp
        );
    }

    function getReputation(string calldata companyId)
        external
        view
        returns (
            uint8 complianceScore,
            uint8 riskScore,
            uint8 trustScore,
            uint8 overallScore,
            address attestedBy,
            uint256 timestamp,
            bool exists
        )
    {
        ReputationAttestation memory rep = reputations[companyId];

        return (
            rep.complianceScore,
            rep.riskScore,
            rep.trustScore,
            rep.overallScore,
            rep.attestedBy,
            rep.timestamp,
            rep.exists
        );
    }
}
