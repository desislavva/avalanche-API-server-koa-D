const dotenv = require('dotenv');

dotenv.config();

const cChainMethods = require('../services/c-chain');
const xChainMethods = require('../services/x-chain');
const pChainMethods = require('../services/p-chain');

const X_CHAIN = 'X';
const P_CHAIN = 'P';
const C_CHAIN = '0x';

exports.getTransactionByHash = async (to) => {
    let xChainTransaction;
    let cChainTransaction;
    let pChainTransaction;
    

    xChainTransaction = await xChainMethods.getTransactionByIdFromXChain(to.params.hash);
    cChainTransaction = await cChainMethods.getTransactionByHashFromCChain(to.params.hash);
    pChainTransaction = await pChainMethods.getTransactionByIdFromPChain(to.params.hash);

   if (xChainTransaction != 1) {
        return xChainTransaction;
       
    } else if (cChainTransaction[0] != 1) {
        return cChainTransaction[1];
        
    } else if (pChainTransaction != 1) {
       return pChainTransaction;
        
    }
    return JSON.parse('{"result":"connection refused to avalanche client or api call rejected"}');

};

exports.getXTransactionsAfterNthFromAddress = async (to) => {
    let xChainTransactions;
    let pChainTransactions;
    let cChainTransactions;
   

    if ((to.params.address).charAt(0) == X_CHAIN) {
        xChainTransactions = await xChainMethods.getXTransactionsAfterNthFromAddressFromXChain(to.params.address, to.params.n, to.params.x);

        if (xChainTransactions[0] == 1) {
           return xChainTransactions[1];   
        } 
            return xChainTransactions[1];
           
        
    } else if ((to.params.address).charAt(0) == P_CHAIN) {
        pChainTransactions = await pChainMethods.getXTransactionsAfterNthFromAddressFromPChain(to.params.address, to.params.n, to.params.x);
        
        if (pChainTransactions == 1) {
           return JSON.parse('{"result":"api call rejected or not enough transactions"}');
        }
            return pChainTransactions;
            
        
    } else if ((to.params.address).slice(0, 2) == C_CHAIN) {
        cChainTransactions = await cChainMethods.getXTransactionsAfterNthFromAddressFromCChain(to.params.address, to.params.n, to.params.x);

        return  cChainTransactions;
       
    } 
        return JSON.parse('{"result":"wrong chain"}');
    
};

exports.getXPendingTransactionsAfterNth = async (to) => {
    

    if (to.params.n > 0 && to.params.x > 0) {
        cChainTransactions = await cChainMethods.getXPendingTransactionsAfterNthFromCChain(to.params.n, to.params.x);

        if (cChainTransactions[0] == 1) {
           return cChainTransactions[1]; 
        } 
            return cChainTransactions[1];
           
    } 
        return JSON.parse('{"result":"n and x < 0"}');
    
};

exports.getRecentTransactionsFromXChain = async () => {
    

    xChainTransaction = await xChainMethods.getRecentTransactions();

    if (xChainTransaction[0] == 1) {
        return xChainTransaction[1];
          
    } 
       return xChainTransaction[1];
    
};

exports.getRecentTransactionsFromPChain = async () => {
    

    pChainTransaction = await pChainMethods.getRecentTransactions();

    if (pChainTransaction[0] == 1) {
       return pChainTransaction[1];
        
    } 
        return pChainTransaction[1];
        
    
};