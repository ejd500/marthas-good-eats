const express = require('express');
const router = express.Router();
//const menuItemsDAL = require('../services/pg.menuItems.dal');
const menuItemsDAL = require('../services/m.menuItems.dal');

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management');
    res.render('managementHome');
});

router.get('/menu-items', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items');      
    try {
      let menuItems = await menuItemsDAL.getMenuItems(); 
      if(DEBUG) console.table(menuItems);
      res.render('menuItemsStaff', {menuItems:menuItems});
    } catch {
      res.status(500);
      res.render('500');
    };
});

router.get('/menu-items/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items/' + req.params.id);
    try {
      let menuItem = await menuItemsDAL.getMenuItemById(req.params.id); 
      if(DEBUG) console.table(menuItem);
      res.render('menuItem', {menuItem:menuItem});
    } catch {
      res.status(500);
      res.render('500');
    };
});
  
  
router.get('/menu-items/:id/edit', async (req, res) => {
    if(DEBUG) console.log('ROUTE /management/menu-items/' + req.params.id + '/edit');
    let menuItem = await menuItemsDAL.getMenuItemById(req.params.id); 
  res.render('menuItemPatch', {...menuItem});
});
  
  
router.get('/menu-items/:id/delete', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items/' + req.params.id + '/delete');
    let menuItem = await menuItemsDAL.getMenuItemById(req.params.id);
    res.render('menuItemDelete', {...menuItem});
});

router.post('/menu-items/', async (req, res) => {
    if(DEBUG) console.log("menuItemsStaff.POST");
    try {
        await menuItemsDAL.addMenuItem(req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
        res.redirect('/management/menu-items');
    } catch (err){
        res.status(500);
        res.render('500');
    } 
});

router.patch('/menu-items/:id/edit', async (req, res) => {
    if(DEBUG) console.log('ROUTE /management/menu-items/' + req.params.id +  '/edit (PATCH)' );
    try {
      await menuItemsDAL.patchMenuItem(req.params.id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
      res.redirect('/management/menu-items');
    } catch {
      res.status = (500);
      res.render('500');
    }
});

router.delete('/menu-items/:id/delete', async (req, res) => {            
  if(DEBUG) console.log('MenuItems.DELETE: ' + req.params.id);
  try {
      await menuItemsDAL.deleteMenuItem(req.params.id);
      res.redirect('/management/menu-items');
  } catch {
      res.status(500);
      res.render('500');
}});

router.get('/logout', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/logout');
    res.render('staffLogout.ejs');
});

module.exports = router;

/*const menuItems = [
          {menu_id: 7, name: 'Soup', price: '7.99', category: 'Lunch'},
          {menu_id: 1, name: 'Pancakes', price: '14.99', category: 'Breakfast'},
          {menu_id: 4, name: 'Burger', price: '17.99', category: 'Dinner'}];*/