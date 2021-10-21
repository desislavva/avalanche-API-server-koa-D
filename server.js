const Koa = require('koa')
const Routes = require('./src/routes/routes')

//require('./websocket/websocket-server');

const app = new Koa()


const dotenv = require('dotenv');
dotenv.config();

app.use( async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})


app.use(Routes.routes())
  .use(Routes.allowedMethods()) // registering routes to the application

app.listen(process.env.SERVER_PORT, () => console.log('Server running at: http://' + process.env.SERVER_ADDRESS))
