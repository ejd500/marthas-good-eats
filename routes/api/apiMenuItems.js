const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal')

router.get('/', async (req, res) => {
    /*const menuItems = [
        {id: 7, name: 'soup', price: '7.99'},
        {id: 1, name: 'pancakes', price: '14.99'},
        {id: 4, name: 'burger', price: '17.99'},
    ];*/
    //res.send(menuItems);
  if(DEBUG) console.log('ROUTE: /api/menu-items/ GET' + req.url);
  try {
      let menuItems = await menuItemsDAL.getMenuItems(); 
      if(DEBUG) console.table(menuItems);
      res.json(menuItems);
  } catch {
      res.statusCode = 500;
      res.json({message: "Internal Server Error", status: 500});
  };
});

router.get('/:id', async (req, res) => { 
  if(DEBUG) console.log('ROUTE: /api/menu-items/:id GET' + req.url);
    try {
        let menuItem = await menuItemsDAL.getMenuItemById(req.params.id); 
        if(DEBUG) console.table(menuItem);
        res.json(menuItem);
    } catch {
        res.statusCode = 500;
        res.json({message: "Internal Server Error", status: 500});
    };
}); 

router.post('/', async (req, res) => {
           if(DEBUG) {console.log('ROUTE: /api/menu-items/ POST');}        
        try {
            await menuItemsDAL.addMenuItem(req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url );
            res.statusCode = 201;
            res.json({message: "Created", status: 201});
        } catch {
            res.statusCode = 500;
            res.json('500');
        } 
     
});

//router.patch('/:id', async (req, res) => {});
//router.delete('/:id', async (req, res) => {});


module.exports = router;