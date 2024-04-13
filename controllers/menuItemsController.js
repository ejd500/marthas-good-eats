DEBUG = true;

const fullTextDAL = require('../services/pg.fulltext.dal');
const menuItemsDAL = require('../services/pg.menuItems.dal');

const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new EventEmitter();

myEmitter.on("customerSearchLog", (searchWords, userID, category)=>{
    const date = new Date;
    if(DEBUG) console.log(`User ID ${userID} searched the ${category} menu for "${searchWords}" on ${date}`)
  
    if(!fs.existsSync(path.join(__dirname, '..', 'customerLogs'))){
        fs.mkdirSync(path.join(__dirname, '..', 'customerLogs'));
    }
    fs.appendFile(path.join(__dirname, '..', 'customerLogs', 'customerSearch.log'), `User ID ${userID} searched ${category} menu for "${searchWords}" on ${date}\n`, (error)=>{if(error) throw error})
  
  })

async function menuItemsController (req, res) {
    if (DEBUG) console.table('ROUTE: /menu-items (GET)');     
    try {
        let menuItems;
        const searchText = req.query.search;
        if (searchText) {
            menuItems = await fullTextDAL.getFullText(searchText);
            if(req.query.category != undefined){
                var user = req.session.user;
                var userID = user.user_id;
                var category = req.query.category;
                myEmitter.emit('customerSearchLog', searchText, userID, category);
            } else {
                var user = req.session.user;
                var userID = user.user_id;
                var category = "All";
                myEmitter.emit('customerSearchLog', searchText, userID, category);
            }
        } else {
            menuItems = await menuItemsDAL.getMenuItems(); 
        }
        
      // Filter by category if provided
    var category = req.query.category;
    if (DEBUG) console.log('Received category:', category);
      if (category && category !== 'All') {
          menuItems = menuItems.filter(item => item.category === category);
        }

      // Group menu items by category
      const groupedMenuItems = menuItems.reduce((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
      }, {});

      res.render('menuItems', { groupedMenuItems: groupedMenuItems, selectedCategory: category });
  } catch (err) {
      console.log(err);
      res.status('500');
      res.render('500', {error: err});
  }
}

module.exports = {menuItemsController};