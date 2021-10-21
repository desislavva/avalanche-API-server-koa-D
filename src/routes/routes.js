const koaRouter = require('@koa/router')

const blocks = require('../controllers/blocks');
const transactions = require('../controllers/transactions');
const network = require('../controllers/network');
const address = require('../controllers/address');

const router = new koaRouter();


/////////////// NETWORK /////////////////

router.get('/network', async ctx => {
    const result =  await network.getNetWorkActivity();
    ctx.body = result;
});


/////////////// BLOCKS ///////////////////

router.get('/blocks/number/:blocknumber', async ctx => {
    const result =  await blocks.getBlockByNumber(ctx);
    ctx.body = result;
 });


 router.get('/blocks/hash/:hash', async ctx => {
    const result =  await blocks.getBlockByHash(ctx);
    ctx.body = result;
 });

 router.get('/blocks/numbers/:blocknumber/:count', async ctx => {
    const result =  await blocks.getXBlocksFromNthFromCChain(ctx);
    ctx.body = result;
 });

 /////////////// TRANSACTIONS ///////////////////

 router.get('/transactions/hash/:hash', async ctx => {
    const result =  await transactions.getTransactionByHash(ctx);
    ctx.body = result;
 });

 router.get('/transactions/:address/:n/:x', async ctx => {
    const result =  await transactions.getXTransactionsAfterNthFromAddress(ctx);
    ctx.body = result;
 });

 router.get('/transactions/:n/:x', async ctx => {
    const result =  await transactions.getXPendingTransactionsAfterNth(ctx);
    ctx.body = result;
 });
 
 router.get('/transactions/recentpchain', async ctx => {
    const result =  await transactions.getRecentTransactionsFromPChain();
    ctx.body = result;
 });

 router.get('/transactions/recentxchain', async ctx => {
    const result =  await transactions.getRecentTransactionsFromXChain();
    ctx.body = result;
 });
 
 /////////////// ADDRESS ///////////////////

 router.get('/address/hash/:hash', async ctx => {
    const result =  await address.getAddressInfoByHash(ctx);
    ctx.body = result;
 });


module.exports = router;