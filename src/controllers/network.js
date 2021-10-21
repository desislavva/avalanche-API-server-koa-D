const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()


exports.getNetWorkActivity = async () => {

  let result = []
 

  await axios.post(
      process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'platform.getTotalStake',
        params: {},
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then((response) => {
      result.push(response.data.result.stake)
    })
    .catch((error) => {
      if (!error.response) {
        console.log('connection refused to avalanche client')
        return { result: 'connection refused to avalanche client' }
      } 
        console.log(error.response.data)
        return error.response.data

    })

  await axios
    .post(
      process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'platform.getCurrentValidators',
        params: {},
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then((response) => {
      result.push(response.data.result.validators.length)
    })
    .catch((error) => {
      if (!error.response) {
        console.log('connection refused to avalanche client')
        ctx.body = { result: 'connection refused to avalanche client' }
      } 
        console.log(error.response.data)
        return error.response.data
    })

  await axios
    .post(
      process.env.C_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_blockNumber',
        params: [],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then((response) => {
      result.push(parseInt(response.data.result))
    })
    .catch((error) => {
      if (!error.response) {
        console.log('connection refused to avalanche client')
        ctx.body = { result: 'connection refused to avalanche client' }
      }
        console.log(error.response.data)
        return error.response.data
        
      
    })

  await axios
    .post(
      process.env.P_CHAIN_BC_CLIENT_BLOCK_ENDPOINT,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'platform.getHeight',
        params: {},
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then((response) => {
      result.push(response.data.result.height)
    })
    .catch((error) => {
      if (!error.response) {
        console.log('connection refused to avalanche client')
        return { result: 'connection refused to avalanche client' }
      } 
        console.log(error.response.data)
        return error.response.data
    })

    return "hello"

}