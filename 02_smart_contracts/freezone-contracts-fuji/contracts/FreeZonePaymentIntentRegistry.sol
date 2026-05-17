// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IFreeZoneDocumentRegistry {
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
        );
}

/**
 * @title FreeZonePaymentIntentRegistry
 * @notice Records cross-border payment intents gated by operational trust.
 * @dev This contract does NOT custody funds. It records proof that a payment can be released.
 */
contract FreeZonePaymentIntentRegistry is Ownable {
    enum PaymentStatus {
        Created,
        Blocked,
        Released,
        Settled,
        Cancelled
    }

    struct PaymentIntent {
        bytes32 paymentId;
        string channelId;
        string fromCompanyId;
        string toCompanyId;
        uint256 amountUsdCents;
        string currencyFrom;
        string currencyTo;
        uint8 requiredOverallScore;
        uint8 observedOverallScore;
        PaymentStatus status;
        address createdBy;
        uint256 createdAt;
        uint256 updatedAt;
    }

    IFreeZoneDocumentRegistry public immutable documentRegistry;

    mapping(bytes32 => PaymentIntent) private payments;

    event PaymentIntentCreated(
        bytes32 indexed paymentId,
        string indexed channelId,
        string fromCompanyId,
        string toCompanyId,
        uint256 amountUsdCents,
        PaymentStatus status,
        uint256 timestamp
    );

    event PaymentReleased(
        bytes32 indexed paymentId,
        uint8 observedOverallScore,
        uint256 timestamp
    );

    event PaymentSettled(
        bytes32 indexed paymentId,
        string providerReference,
        uint256 timestamp
    );

    event PaymentCancelled(
        bytes32 indexed paymentId,
        uint256 timestamp
    );

    error PaymentAlreadyExists(bytes32 paymentId);
    error PaymentNotFound(bytes32 paymentId);
    error ReputationMissing(string companyId);
    error TrustThresholdNotMet(uint8 observed, uint8 required);
    error InvalidAmount();
    error EmptyString();

    constructor(address initialOwner, address documentRegistryAddress) Ownable(initialOwner) {
        documentRegistry = IFreeZoneDocumentRegistry(documentRegistryAddress);
    }

    function createPaymentIntent(
        bytes32 paymentId,
        string calldata channelId,
        string calldata fromCompanyId,
        string calldata toCompanyId,
        uint256 amountUsdCents,
        string calldata currencyFrom,
        string calldata currencyTo,
        uint8 requiredOverallScore
    ) external onlyOwner {
        if (paymentId == bytes32(0)) revert PaymentNotFound(paymentId);
        if (payments[paymentId].createdAt != 0) revert PaymentAlreadyExists(paymentId);
        if (amountUsdCents == 0) revert InvalidAmount();

        if (
            bytes(channelId).length == 0 ||
            bytes(fromCompanyId).length == 0 ||
            bytes(toCompanyId).length == 0 ||
            bytes(currencyFrom).length == 0 ||
            bytes(currencyTo).length == 0
        ) {
            revert EmptyString();
        }

        (
            ,
            ,
            ,
            uint8 overallScore,
            ,
            ,
            bool exists
        ) = documentRegistry.getReputation(toCompanyId);

        if (!exists) revert ReputationMissing(toCompanyId);

        PaymentStatus status = overallScore >= requiredOverallScore
            ? PaymentStatus.Released
            : PaymentStatus.Blocked;

        payments[paymentId] = PaymentIntent({
            paymentId: paymentId,
            channelId: channelId,
            fromCompanyId: fromCompanyId,
            toCompanyId: toCompanyId,
            amountUsdCents: amountUsdCents,
            currencyFrom: currencyFrom,
            currencyTo: currencyTo,
            requiredOverallScore: requiredOverallScore,
            observedOverallScore: overallScore,
            status: status,
            createdBy: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit PaymentIntentCreated(
            paymentId,
            channelId,
            fromCompanyId,
            toCompanyId,
            amountUsdCents,
            status,
            block.timestamp
        );

        if (status == PaymentStatus.Released) {
            emit PaymentReleased(paymentId, overallScore, block.timestamp);
        }
    }

    function releasePayment(bytes32 paymentId) external onlyOwner {
        PaymentIntent storage payment = payments[paymentId];
        if (payment.createdAt == 0) revert PaymentNotFound(paymentId);

        (
            ,
            ,
            ,
            uint8 overallScore,
            ,
            ,
            bool exists
        ) = documentRegistry.getReputation(payment.toCompanyId);

        if (!exists) revert ReputationMissing(payment.toCompanyId);
        if (overallScore < payment.requiredOverallScore) {
            revert TrustThresholdNotMet(overallScore, payment.requiredOverallScore);
        }

        payment.observedOverallScore = overallScore;
        payment.status = PaymentStatus.Released;
        payment.updatedAt = block.timestamp;

        emit PaymentReleased(paymentId, overallScore, block.timestamp);
    }

    function markSettled(bytes32 paymentId, string calldata providerReference)
        external
        onlyOwner
    {
        PaymentIntent storage payment = payments[paymentId];
        if (payment.createdAt == 0) revert PaymentNotFound(paymentId);
        if (bytes(providerReference).length == 0) revert EmptyString();

        payment.status = PaymentStatus.Settled;
        payment.updatedAt = block.timestamp;

        emit PaymentSettled(paymentId, providerReference, block.timestamp);
    }

    function cancelPayment(bytes32 paymentId) external onlyOwner {
        PaymentIntent storage payment = payments[paymentId];
        if (payment.createdAt == 0) revert PaymentNotFound(paymentId);

        payment.status = PaymentStatus.Cancelled;
        payment.updatedAt = block.timestamp;

        emit PaymentCancelled(paymentId, block.timestamp);
    }

    function getPayment(bytes32 paymentId) external view returns (PaymentIntent memory) {
        PaymentIntent memory payment = payments[paymentId];
        if (payment.createdAt == 0) revert PaymentNotFound(paymentId);

        return payment;
    }
}
