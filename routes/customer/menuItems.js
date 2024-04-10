const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal');
//const menuItemsDAL = require('../../services/m.menuItems.dal');
const pgFullTextDAL = require('../../services/pg.fulltext.dal');

router.get('/', async (req, res) => {
    if (DEBUG) console.table('ROUTE: /menu-items (GET)');     
    try {
        let menuItems;
        const searchText = req.query.search;
        if (searchText) {
            menuItems = await pgFullTextDAL.getFullText(searchText);
        } else {
            menuItems = await menuItemsDAL.getMenuItems(); 
        }
        
      // Filter by category if provided
      const category = req.query.category;
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
      console.error(err);
      res.status('500');
      res.render('500', {error: err});
  }
});

module.exports = router;


/*const menuItems = [
        {id: 7, image_url: '/Images/soup.jpg',name: 'Chicken Noodle Soup', description: 'Soup for the soul made fresh daily.', price: '7.99', category: 'Lunch', },
        {id: 1, image_url: '/Images/pancakes.jpg',name: 'Pancakes', description: 'Pancakes with strawberries and blueberries',price: '14.99', category: 'Breakfast'},
        {id: 4, image_url: '/Images/burgers.jpg', name: 'Premium Beef Burgers', description: 'Burgers for two with fries.', price: '17.99', category: "Dinner", }];*/