const WebSocket = require('ws');

const dotenv = require('dotenv');

const websocketAddressMethods = require('./src/controllers/address');
const websocketBlockMethods = require('./src/controllers/blocks');
const websocketTransactionMethods = require('./src/controllers/transactions');
const websocketNetworkMethods = require('./src/controllers/network');

dotenv.config();

const wss = new WebSocket.WebSocketServer({ port: process.env.WEBSOCKET_PORT });

wss.on('connection', (ws, req)  => {
    console.log(`New connection. `);

    ws.on('message', async (jsonData) => {
        let message;
        let result;

        try {
            message = JSON.parse(jsonData);
        } catch (error) {
            ws.send('Input must be JSON! ');
            return;
        }

        switch(message.method) {
            case 'getAddressInfoByHash':
                result =  await websocketAddressMethods.getAddressInfoByHash(message);
                ws.send(JSON.stringify(result));  
                break;

            case 'getBlockByHash':
                result =  await websocketBlockMethods.getBlockByHash(message);
                ws.send(JSON.stringify(result));  
                break;
    
            case 'getBlockByNumber':
                result =  await websocketBlockMethods.getBlockByNumber(message);
                ws.send(JSON.stringify(result));  
                break;

            case 'getXBlocksFromNthFromCChain':
                result =  await websocketBlockMethods.getXBlocksFromNthFromCChain(message);
                ws.send(JSON.stringify(result));  
                break;

            case 'getTransactionByHash':
                result =  await websocketTransactionMethods.getTransactionByHash(message);
                ws.send(JSON.stringify(result));  
                break;

            case 'getXTransactionsAfterNthFromAddress':
                result =  await websocketTransactionMethods.getXTransactionsAfterNthFromAddress(message);
                ws.send(JSON.stringify(result));  
                break;
                
            case 'getXPendingTransactionsAfterNth':
                result =  await websocketTransactionMethods.getXPendingTransactionsAfterNth(message);
                ws.send(JSON.stringify(result));  
                break;

            case 'getRecentTransactionsFromXChain':
                result =  await websocketTransactionMethods.getRecentTransactionsFromXChain(message);
                ws.send(JSON.stringify(result));  
                break;
               
            case 'getRecentTransactionsFromPChain':
                result =  await websocketTransactionMethods.getRecentTransactionsFromPChain(message);
                ws.send(JSON.stringify(result));  
                break;


            case 'getNetWorkActivity':
                result =  await websocketNetworkMethods.getNetWorkActivity();
                ws.send(JSON.stringify(result));  
                break;
                
        }
    });
});