
const express = require('express')
require('dotenv').config();
const app = express()
const ModelClass = require('./model.js');
const Model = new ModelClass();

const store = require('./routes/store/index.js')
app.use('/', store)


const server = async() => 
{
  await Model.connectDataBase();
  await Model.setupDatabase();
  //const{rows} = await pool.query('SELECT * FROM public.stores');
  //console.log(rows);

  app.listen(3000, () => {
    console.log('Server is running at port 3000')
  });
};


server();