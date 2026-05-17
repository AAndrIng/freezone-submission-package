require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY = (process.env.DEPLOYER_PRIVATE_KEY || "").trim();
const FUJI_RPC_URL =
  process.env.FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc";

if (
  DEPLOYER_PRIVATE_KEY &&
  !/^0x[0-9a-fA-F]{64}$/.test(DEPLOYER_PRIVATE_KEY)
) {
  throw new Error(
    "DEPLOYER_PRIVATE_KEY inválida. Debe tener formato 0x + 64 caracteres hexadecimales."
  );
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      viaIR: true
    }
  },
  networks: {
    fuji: {
      url: FUJI_RPC_URL,
      chainId: 43113,
      accounts: DEPLOYER_PRIVATE_KEY ? [DEPLOYER_PRIVATE_KEY] : []
    }
  }
};
