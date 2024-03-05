const express = require('express')
const app = express()
const ModelClass = require('../../model');
const Model = new ModelClass();

const restaurants = require('./restaurants.json')

app.get('/restaurants/restaurantname/', async (req, res) => {
  const restaurants = await Model.getAllRestaurants();
    const { restaurantname } = req.query;
  
    const index = restaurants.findIndex(restaurant => restaurant.name === restaurantname);
    console.log(index);
  
    if (index > -1) {
      res.send(restaurants[index])
    } else {
      res.send('Restaurant not found!')  
    }
  })
  
  app.get('/restaurants/all', async (req, res) => {
    const restaurants = await Model.getAllRestaurants();
    res.send(restaurants);
  });


  app.delete('/restaurants/restaurantname/', function (req, res) {
    const { restaurantname } = req.query
    console.log(restaurantname)
    const index = restaurants.findIndex(restaurant => restaurant.name === restaurantname)
    if (index > -1) {
      restaurants.splice(index, 1)
      res.send(`Restaurant found! Deleting restaurant with index: ${index}`)
    } else {
      res.send('Restaurant not found!')
    }
  })
  
  app.post('/restaurants/restaurantname/',
    express.json(), // for parsing application/json body in POST
    (req, res) => {
      const { body } = req
      console.log(body)
      restaurants.push(body)
      res.send('Restaurant added!')
  })
  
  
  module.exports=app