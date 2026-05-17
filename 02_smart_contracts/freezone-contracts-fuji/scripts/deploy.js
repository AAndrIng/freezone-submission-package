const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying FreeZone contracts to:", hre.network.name);
  console.log("Deployer:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", hre.ethers.formatEther(balance), "AVAX");

  const DocumentRegistry = await hre.ethers.getContractFactory(
    "FreeZoneDocumentRegistry"
  );
  const documentRegistry = await DocumentRegistry.deploy(deployer.address);
  await documentRegistry.waitForDeployment();

  const documentRegistryAddress = await documentRegistry.getAddress();
  console.log("FreeZoneDocumentRegistry:", documentRegistryAddress);

  const PaymentIntentRegistry = await hre.ethers.getContractFactory(
    "FreeZonePaymentIntentRegistry"
  );
  const paymentIntentRegistry = await PaymentIntentRegistry.deploy(
    deployer.address,
    documentRegistryAddress
  );
  await paymentIntentRegistry.waitForDeployment();

  const paymentIntentRegistryAddress = await paymentIntentRegistry.getAddress();
  console.log("FreeZonePaymentIntentRegistry:", paymentIntentRegistryAddress);

  const deployment = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    deployer: deployer.address,
    contracts: {
      FreeZoneDocumentRegistry: documentRegistryAddress,
      FreeZonePaymentIntentRegistry: paymentIntentRegistryAddress
    },
    explorer: {
      documentRegistry:
        `https://testnet.snowtrace.io/address/${documentRegistryAddress}`,
      paymentIntentRegistry:
        `https://testnet.snowtrace.io/address/${paymentIntentRegistryAddress}`
    },
    deployedAt: new Date().toISOString()
  };

  const outDir = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, `${hre.network.name}.json`),
    JSON.stringify(deployment, null, 2)
  );

  console.log("\nDeployment saved to deployments/" + hre.network.name + ".json");
  console.log(JSON.stringify(deployment, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
