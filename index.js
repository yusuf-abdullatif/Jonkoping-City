const express = require('express')
const app = express()

const stores = require('./stores.json')
const port = 3000;

app.get('/', (req, res) => {
    res.json(stores);
})
app.listen(3000, () => {
  console.log('Server is running at port 3000')
})
