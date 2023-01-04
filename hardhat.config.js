require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    // Configure each network to the respective Avalanche instances
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      gas: 2100000,
      gasPrice: 8000000000,
      gasLimit: 8000000,
    },
  },
};
/*
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      gas: 2100000,
      gasPrice: 8000000000,
      gasLimit: 8000000,
    },
  },
};



  */
