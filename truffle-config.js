const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider:() => new HDWalletProvider(process.env.PRIV_KEY,"https://rinkeby.infura.io/v3/99b6bb75ccaa42b68d5e4766d1c4c146"),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers:{
    solc: {
      version: "^0.8.7"
    }
  }
};
