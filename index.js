require('dotenv').config();

const express = require('express')
const cookieParser=require('cookie-parser');
const app = express()
const ModelClass = require('./model.js');
const Model = new ModelClass();
const port =  process.env.PORT || 3000;


const store = require('./routes/store/index.js')
app.use('/', store)
app.use(cookieParser());

app.get('/login', async (req,res) =>{
  const {username, password} = req.query;
  if(username === 'yusuf' && password === '12345'){
    res.cookie('token', 'super-secret-cookie',{httpOnly: true})
    res.send('Login successful');
  } else{
    res.status(401).send("Invalid username or password");
  }

});

app.get('/protected', async(req, res) => {
  const{token} = req.cookies;
  if(token === 'super-secret-cookie'){
    res.send('User is logged in!');
  }else{
    res.status(401).send('Unauthorized');
  }
  res.send('Protected route');
})


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