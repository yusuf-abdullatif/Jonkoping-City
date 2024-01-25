const express = require('express')
const app = express()

const {Pool} = require('pg');

const store = require('./routes/store/index.js')
app.use('/', store)


const server = async() => 
{
  
  app.listen(3000, () => {
    console.log('Server is running at port 3000')
  });
};


server();