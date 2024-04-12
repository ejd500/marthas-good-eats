const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal');
//const menuItemsDAL = require('../../services/m.menuItems.dal');
const fullTextDAL = require('../../services/pg.fulltext.dal');
//const fullTextDAL = require('../../services/m.fulltext.dal');
const fs = require('fs');
const path = require('path');

const { menuItemsController } = require('../../controllers/menuItemsController');

// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize a new emitter object
const myEmitter = new EventEmitter();

myEmitter.on("customerSearchLog", (searchWords, userID, category)=>{
  const date = new Date;
  if(DEBUG) console.log(`User ID ${userID} searched the ${category} menu for "${searchWords}" on ${date}`)

  if(!fs.existsSync(path.join(__dirname, '../..', 'customerLogs'))){
      fs.mkdirSync(path.join(__dirname, '../..', 'customerLogs'));
  }
  fs.appendFile(path.join(__dirname, '../..', 'customerLogs', 'customerSearch.log'), `User ID ${userID} searched ${category} menu for "${searchWords}" on ${date}\n`, (error)=>{if(error) throw error})

})

router.get('/', menuItemsController);

module.exports = router;


/*const menuItems = [
        {id: 7, image_url: '/Images/soup.jpg',name: 'Chicken Noodle Soup', description: 'Soup for the soul made fresh daily.', price: '7.99', category: 'Lunch', },
        {id: 1, image_url: '/Images/pancakes.jpg',name: 'Pancakes', description: 'Pancakes with strawberries and blueberries',price: '14.99', category: 'Breakfast'},
        {id: 4, image_url: '/Images/burgers.jpg', name: 'Premium Beef Burgers', description: 'Burgers for two with fries.', price: '17.99', category: "Dinner", }];*/