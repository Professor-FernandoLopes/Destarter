const CampaignFactory = artifacts.require('CampaignFactory.sol');

module.exports = function (deployer, network) {
  if(network === 'bscTestnet') {
    deployer.deploy(CampaignFactory, '0x3b5805a6Af5E3E262FbB45362FDf3C501919B658','0x1a3293B02D9113A4023fDA12C1380c99ce597143');
  } else {
    deployer.deploy(CampaignFactory, '0x3b5805a6Af5E3E262FbB45362FDf3C501919B658','0x1a3293B02D9113A4023fDA12C1380c99ce597143');
  }
};
