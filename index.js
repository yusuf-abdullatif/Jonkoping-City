
const express = require('express')
require('dotenv').config();
const app = express()

const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: process.env.PGPASSWORD,
  port: 5432,
});

const store = require('./routes/store/index.js')
app.use('/', store)


const server = async() => 
{
  await pool.connect();

  const{rows} = await pool.query('SELECT * FROM public.stores');
  console.log(rows);

  app.listen(3000, () => {
    console.log('Server is running at port 3000')
  });
};


server();