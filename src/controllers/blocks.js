const cChainMethods = require('../services/c-chain');
const dotenv = require('dotenv')

dotenv.config();

//get block by hash 
exports.getBlockByHash = async (to) => {
    const blockFromCChain = await cChainMethods.getBlockByHashFromCChain(to.params.hash);
    

    if (blockFromCChain[0] == 1) {
        return blockFromCChain[1]
      
    } 
        return blockFromCChain[1]
    
};


//get block by number 
exports.getBlockByNumber = async (to) => {
    const cChainNumber = await cChainMethods.getBlockByNumberFromCChain(to.params.blocknumber);
    

    if (cChainNumber[0] == 1) {
        return cChainNumber[1];
        
    } return cChainNumber[0];
      
};


//GET X blocks after N-th
exports.getXBlocksFromNthFromCChain = async (to) => {
    const cChainArray = [];
    let k = 0;
    

    const blockNumber = to.params.blocknumber;
    const count = to.params.count;

    for (let i = blockNumber - count; i < blockNumber; ++i)
    {
        let hashValue = await cChainMethods.getBlockByNumberFromCChain(i);
        
        if (hashValue[0] == 1) {
            return hashValue[1];
            
        } 
            cChainArray[k] = hashValue[1];
            k++;
        
    }

    return cChainArray;
    
};