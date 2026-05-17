const hre = require("hardhat");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function bytes32Sha256(input) {
  return "0x" + crypto.createHash("sha256").update(input).digest("hex");
}

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const deploymentPath = path.join(__dirname, "..", "deployments", "fuji.json");
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));

  console.log("Network:", hre.network.name);
  console.log("Signer:", signer.address);
  console.log("Expected deployer:", deployment.deployer);

  const documentRegistry = await hre.ethers.getContractAt(
    "FreeZoneDocumentRegistry",
    deployment.contracts.FreeZoneDocumentRegistry
  );

  const paymentRegistry = await hre.ethers.getContractAt(
    "FreeZonePaymentIntentRegistry",
    deployment.contracts.FreeZonePaymentIntentRegistry
  );

  const documentOwner = await documentRegistry.owner();
  const paymentOwner = await paymentRegistry.owner();

  console.log("DocumentRegistry owner:", documentOwner);
  console.log("PaymentIntentRegistry owner:", paymentOwner);

  if (documentOwner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error("Signer is not the owner of FreeZoneDocumentRegistry. Check DEPLOYER_PRIVATE_KEY.");
  }

  if (paymentOwner.toLowerCase() !== signer.address.toLowerCase()) {
    throw new Error("Signer is not the owner of FreeZonePaymentIntentRegistry. Check DEPLOYER_PRIVATE_KEY.");
  }

  const runId = Date.now();

  const companyId = "company-mx-001";
  const docType = "certificate_of_origin";

  // Unique per run to avoid DocumentAlreadyRegistered revert.
  const docHash = bytes32Sha256(
    `FreeZone certificate_of_origin.pdf Materiales Norteño SA ${runId}`
  );

  console.log("\nRegistering document:", docHash);
  const tx1 = await documentRegistry.registerDocument(docHash, companyId, docType);
  const receipt1 = await tx1.wait();
  console.log("Document tx:", tx1.hash);
  console.log("Document block:", receipt1.blockNumber);

  console.log("\nUpdating reputation...");
  const tx2 = await documentRegistry.updateReputation(companyId, 78, 31, 71, 74);
  const receipt2 = await tx2.wait();
  console.log("Reputation tx:", tx2.hash);
  console.log("Reputation block:", receipt2.blockNumber);

  const paymentId = bytes32Sha256(`payment-demo-001-${runId}`);

  console.log("\nCreating payment intent:", paymentId);
  const tx3 = await paymentRegistry.createPaymentIntent(
    paymentId,
    "channel-demo-001",
    "company-ar-001",
    "company-mx-001",
    4750000,
    "ARS",
    "MXN",
    70
  );
  const receipt3 = await tx3.wait();
  console.log("Payment intent tx:", tx3.hash);
  console.log("Payment block:", receipt3.blockNumber);

  const output = {
    network: hre.network.name,
    chainId: 43113,
    signer: signer.address,
    contracts: {
      FreeZoneDocumentRegistry: deployment.contracts.FreeZoneDocumentRegistry,
      FreeZonePaymentIntentRegistry: deployment.contracts.FreeZonePaymentIntentRegistry
    },
    demo: {
      companyId,
      docType,
      docHash,
      paymentId,
      documentTx: tx1.hash,
      reputationTx: tx2.hash,
      paymentIntentTx: tx3.hash,
      documentExplorer: `https://testnet.snowtrace.io/tx/${tx1.hash}`,
      reputationExplorer: `https://testnet.snowtrace.io/tx/${tx2.hash}`,
      paymentExplorer: `https://testnet.snowtrace.io/tx/${tx3.hash}`
    },
    executedAt: new Date().toISOString()
  };

  const outDir = path.join(__dirname, "..", "deployments");
  fs.writeFileSync(
    path.join(outDir, "fuji-demo-transactions.json"),
    JSON.stringify(output, null, 2)
  );

  console.log("\nDemo transactions saved to deployments/fuji-demo-transactions.json");
  console.log(JSON.stringify(output, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
