const koaRouter = require('@koa/router')

const blocks = require('../controllers/blocks');
const network = require('../controllers/network');

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

module.exports = router;