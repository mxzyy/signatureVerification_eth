require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "width appear life fox foster panel hospital suspect narrow roast because powder"
      },
      chainId: 1337
    }
  }
};
