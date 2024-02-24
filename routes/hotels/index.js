const express = require('express')
const app = express()
const ModelClass = require('../../model');
const Model = new ModelClass();

const hotels = require('./hotels.json')

app.get('/hotels/hotelname/', async (req, res) => {
  const hotels = await Model.getAllHotels();
    const { hotelname } = req.query;
  
    const index = hotels.findIndex(hotel => hotel.name === hotelname);
    console.log(index);
  
    if (index > -1) {
      res.send(hotels[index])
    } else {
      res.send('hotel not found!')  
    }
  })
  
  app.get('/hotels/all', async (req, res) => {
    const hotels = await Model.getAllHotels();
    res.send(hotels);
  });


  app.delete('/hotels/hotelname/', function (req, res) {
    const { hotelname } = req.query
    console.log(hotelname)
    const index = hotels.findIndex(hotel => hotel.name === hotelname)
    if (index > -1) {
      hotels.splice(index, 1)
      res.send(`hotel found! Deleting hotel with index: ${index}`)
    } else {
      res.send('hotel not found!')
    }
  })
  
  app.post('/hotels/hotelname/',
    express.json(), // for parsing application/json body in POST
    (req, res) => {
      const { body } = req
      console.log(body)
      hotels.push(body)
      res.send('hotel added!')
  })
  
  module.exports=app