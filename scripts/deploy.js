const {ethers}= require("hardhat");

async function main() {

const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld");
const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorld", "SPMW")
await superMarioWorld.deployed();

console.log("Success! contract was deployed to", superMarioWorld.address);
await superMarioWorld.mint("https://ipfs.io/ipfs/QmTpjHyWPcBBLkGSewFeb1jsTkoL4sKCDQYKVkPpE4UfrU")

console.log("NFT successfully minted")

}
//npx hardhat run scripts/deploy.js --network mumbai


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
