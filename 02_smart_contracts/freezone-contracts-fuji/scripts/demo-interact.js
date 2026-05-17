const hre = require("hardhat");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function bytes32Sha256(input) {
  return "0x" + crypto.createHash("sha256").update(input).digest("hex");
}

async function main() {
  const deploymentPath = path.join(__dirname, "..", "deployments", "fuji.json");
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));

  const documentRegistry = await hre.ethers.getContractAt(
    "FreeZoneDocumentRegistry",
    deployment.contracts.FreeZoneDocumentRegistry
  );

  const paymentRegistry = await hre.ethers.getContractAt(
    "FreeZonePaymentIntentRegistry",
    deployment.contracts.FreeZonePaymentIntentRegistry
  );

  const companyId = "company-mx-001";
  const docType = "certificate_of_origin";
  const docHash = bytes32Sha256(
    "FreeZone certificate_of_origin.pdf Materiales Norteño SA"
  );

  console.log("Registering document:", docHash);
  const tx1 = await documentRegistry.registerDocument(docHash, companyId, docType);
  await tx1.wait();
  console.log("Document tx:", tx1.hash);

  console.log("Updating reputation...");
  const tx2 = await documentRegistry.updateReputation(companyId, 78, 31, 71, 74);
  await tx2.wait();
  console.log("Reputation tx:", tx2.hash);

  const paymentId = bytes32Sha256("payment-demo-001");
  console.log("Creating payment intent:", paymentId);

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
  await tx3.wait();
  console.log("Payment intent tx:", tx3.hash);

  console.log({
    docHash,
    paymentId,
    documentTx: tx1.hash,
    reputationTx: tx2.hash,
    paymentTx: tx3.hash,
    documentExplorer: `https://testnet.snowtrace.io/tx/${tx1.hash}`,
    reputationExplorer: `https://testnet.snowtrace.io/tx/${tx2.hash}`,
    paymentExplorer: `https://testnet.snowtrace.io/tx/${tx3.hash}`
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
