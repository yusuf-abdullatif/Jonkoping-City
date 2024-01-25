const express = require('express')
const app = express()

const stores = require('./stores.json')

app.get('/', function (req, res) {
    const { storename } = req.query;
  
    const index = stores.findIndex(store => store.name === storename);
    console.log(index);
  
    if (index > -1) {
      res.send(stores[index])
    } else {
      res.send('Store not found!')
    }
  })
  
  app.delete('/', function (req, res) {
    const { storename } = req.query
    console.log(storename)
    const index = stores.findIndex(store => store.name === storename)
    if (index > -1) {
      stores.splice(index, 1)
      res.send(`Store found! Deleting store with index: ${index}`)
    } else {
      res.send('Store not found!')
    }
  })
  
  app.post('/',
    express.json(), // for parsing application/json body in POST
    (req, res) => {
      const { body } = req
      console.log(body)
      stores.push(body)
      res.send('Store added!')
  })
  
  module.exports=app