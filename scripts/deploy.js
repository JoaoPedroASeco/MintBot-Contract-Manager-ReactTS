const hre = require("hardhat");

async function main() {
  const DefaultContract = await hre.ethers.getContractFactory("CarameloClub");
  const defaultContract = await DefaultContract.deploy();

  await defaultContract.deployed();

  console.log("contract deployed to:", defaultContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
