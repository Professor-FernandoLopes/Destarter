import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi,'0x9DCDA8075B2Beca2F2F41EC2ad55C2EA80CB0596')
  


export default instance;
