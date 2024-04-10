const express = require('express');
const router = express.Router();
const pgMenuItemsDAL = require('../services/pg.menuItems.dal');
const mongoMenuItemsDAL = require('../services/m.menuItems.dal');

var selectedDatabase = '';

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management');
    res.render('managementHome');
});

router.get('/menu-items', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items');
    selectedDatabase = req.query.database;
    console.log("Selected Database: " + selectedDatabase)
    if(selectedDatabase == undefined){
      if(DEBUG) console.log("UNDEFINED")
      try {
        let menuItems = await pgMenuItemsDAL.getMenuItems(); 
        // if(DEBUG) console.log(menuItems);
        res.render('menuItemsStaff', {menuItems:[], selectedDatabase: selectedDatabase});
      } catch (error) {
        res.status(500);
        res.render('500', {error: error});
      };
      
    } else if(selectedDatabase == 'postgres'){
      if(DEBUG) console.log("POSTGRES");
      try {
        let menuItems = await pgMenuItemsDAL.getMenuItems(); 
        // if(DEBUG) console.log(menuItems);
        res.render('menuItemsStaff', {menuItems:menuItems, selectedDatabase: selectedDatabase});
      } catch (error) {
        res.status(500);
        res.render('500', {error: error});
      };
    } else if(selectedDatabase == 'mongo'){
      if(DEBUG) console.log("MONGO")
      try {
        let menuItems = await mongoMenuItemsDAL.getMenuItems(); 
        // if(DEBUG) console.log(menuItems);
        res.render('menuItemsStaff', {menuItems:menuItems, selectedDatabase: selectedDatabase});
      } catch (error) {
        res.status(500);
        res.render('500', {error: error});
      };
    } else if(selectedDatabase == 'select'){
      if(DEBUG) console.log("SELECT")
      try {
        let menuItems = await pgMenuItemsDAL.getMenuItems(); 
        // if(DEBUG) console.log(menuItems);
        res.render('menuItemsStaff', {menuItems:[], selectedDatabase: selectedDatabase});
      } catch (error) {
        res.status(500);
        res.render('500', {error: error});
      };
    }
    
});

router.get('/menu-items/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items/' + req.params.id);
    var objectID = req.params.id;

    if (/^\d+$/.test(objectID)){
      try {
        let menuItem = await pgMenuItemsDAL.getMenuItemById(req.params.id); 
        // if(DEBUG) console.log(menuItem);
        res.render('menuItem', {menuItem:menuItem});
      } catch (error){
        res.status(500);
        res.render('500', {error: error});
      };
    } else {
      try {
        let menuItem = await mongoMenuItemsDAL.getMenuItemById(req.params.id); 
        // if(DEBUG) console.log(menuItem);
        res.render('menuItem', {menuItem:menuItem});
      } catch (error){
        res.status(500);
        res.render('500', {error: error});
      };
    }
});
  
  
router.get('/menu-items/:id/edit', async (req, res) => {
    if(DEBUG) console.log('ROUTE /management/menu-items/' + req.params.id + '/edit');
    var objectID = req.params.id;
    console.log("Object ID: " + objectID);

    if (/^\d+$/.test(objectID)){
      let menuItem = await pgMenuItemsDAL.getMenuItemById(req.params.id); 
      res.render('menuItemPatch', {...menuItem});
    } else {
      let menuItem = await mongoMenuItemsDAL.getMenuItemById(req.params.id); 
      res.render('menuItemPatch', {...menuItem});
    }
});
  
  
router.get('/menu-items/:id/delete', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/menu-items/' + req.params.id + '/delete');
    var objectID = req.params.id;
    console.log("Object ID: " + objectID);

    if (/^\d+$/.test(objectID)){
      let menuItem = await pgMenuItemsDAL.getMenuItemById(req.params.id);
      res.render('menuItemDelete', {...menuItem});
    } else {
      let menuItem = await mongoMenuItemsDAL.getMenuItemById(req.params.id);
      res.render('menuItemDelete', {...menuItem});
    }
});


router.post(`/menu-items`, async (req, res) => {
    if(DEBUG) console.log("menuItemsStaff.POST");
    if(DEBUG) console.log("This is the selected database: " + selectedDatabase)
    if(selectedDatabase == "postgres"){
      try {
        await pgMenuItemsDAL.addMenuItem(req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
        res.redirect(`/management/menu-items`);
      } catch (error){
        res.status(500);
        res.render('500', {error: error});
      } 
    } else if (selectedDatabase == "mongo"){
      try {
        await mongoMenuItemsDAL.addMenuItem(req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
        res.redirect(`/management/menu-items`);
      } catch (error){
        res.status(500);
        res.render('500', {error: error});
      } 
    }
});

router.patch('/menu-items/:id/edit', async (req, res) => {
    if(DEBUG) console.log('ROUTE /management/menu-items/' + req.params.id +  '/edit (PATCH)' );
    var objectID = req.params.id;
    console.log("Object id: " + objectID);

    if (/^\d+$/.test(objectID)){
      try {
        await pgMenuItemsDAL.patchMenuItem(req.params.id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
        res.redirect('/management/menu-items');
      } catch (error) {
        res.status = (500);
        res.render('500', {error: error});
      }
    } else {
      try {
        await mongoMenuItemsDAL.patchMenuItem(req.params.id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
        res.redirect('/management/menu-items');
      } catch (error) {
        res.status = (500);
        res.render('500', {error: error});
      }
    }
});

router.delete('/menu-items/:id/delete', async (req, res) => {            
  if(DEBUG) console.log('MenuItems.DELETE: ' + req.params.id);
  var objectID = req.params.id;
  if (/^\d+$/.test(objectID)){
    try {
      await pgMenuItemsDAL.deleteMenuItem(req.params.id);
      res.redirect('/management/menu-items');
    } catch (error){
      res.status(500);
      res.render('500', {error: error});
    }
  } else {
    try {
      await mongoMenuItemsDAL.deleteMenuItem(req.params.id);
      res.redirect('/management/menu-items');
    } catch (error){
      res.status(500);
      res.render('500', {error: error});
    }
  }
});

router.get('/logout', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /management/logout');
    res.render('staffLogout.ejs');
});

module.exports = router;

/*const menuItems = [
          {menu_id: 7, name: 'Soup', price: '7.99', category: 'Lunch'},
          {menu_id: 1, name: 'Pancakes', price: '14.99', category: 'Breakfast'},
          {menu_id: 4, name: 'Burger', price: '17.99', category: 'Dinner'}];*/