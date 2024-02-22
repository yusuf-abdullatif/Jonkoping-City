const express = require('express')
const app = express()
const ModelClass = require('../../model');
const Model = new ModelClass();

const stores = require('./stores.json')

app.get('/stores/storename/', async (req, res) => {
  const stores = await Model.getAllStores();
    const { storename } = req.query;
  
    const index = stores.findIndex(store => store.name === storename);
    console.log(index);
  
    if (index > -1) {
      res.send(stores[index])
    } else {
      res.send('Store not found!')  
    }
  })
  
  app.get('/stores/all', async (req, res) => {
    const stores = await Model.getAllStores();
    res.send(stores);
  });


  app.delete('/stores/storename/', function (req, res) {
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
  
  app.post('/stores/storename/',
    express.json(), // for parsing application/json body in POST
    (req, res) => {
      const { body } = req
      console.log(body)
      stores.push(body)
      res.send('Store added!')
  })
  
  module.exports=app