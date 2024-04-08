const express = require('express');
const router = express.Router();
//const menuItemsDAL = require('../services/pg.menuItems.dal');
const loginDAL = require('../services/pg.login.dal');

router.get('/', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /login');
  res.render('login', { error: null });
});

router.post('/', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /login (POST)');
  const { email, password } = req.body;

  try {
    const user = await loginDAL.getLoginByEmail(email);
    if (email && email.length !=0) {
      const storedPassword = user[0].password;
      const isStaff = user[0].is_staff;
      if (password === storedPassword) {
        // Passwords match, authentication successful. 
        // IF USER IS STAFF: res.redirect('/management/product-management');
        // ELSE IF USER IS CUSTOMER:   res.redirect('/home');
        if(isStaff){
          res.redirect('/management');
        } else{
          res.redirect('/home');
        }
      } else {
        // Password does not match, authentication failed.
        res.render('login', { error: 'Invalid Password Entered.' });
      }
    } else {
      // Email not matched, authentication failed.
      res.render('login', { error: 'Invalid Email Entered.' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).render('500');
  }
});

// router.get('/menu-items', async (req, res) => {
//   if(DEBUG) console.log('ROUTE: /login/menu-items GET');
//     /*const menuItems = [
//         {menu_id: 7, name: 'Soup', price: '7.99', category: 'Lunch'},
//         {menu_id: 1, name: 'Pancakes', price: '14.99', category: 'Breakfast'},
//         {menu_id: 4, name: 'Burger', price: '17.99', category: 'Dinner'}];*/
//   try {
//     let menuItems = await menuItemsDAL.getMenuItems(); 
//     if(DEBUG) console.table(menuItems);
//     res.render('menuItemsStaff', {menuItems:menuItems});
//   } catch {
//     res.status(500);
//     res.render('500');
//   };
// });

// router.get('/menu-items/:id', async (req, res) => {
//   if(DEBUG) console.log('ROUTE: /login/menu-item ' + req.params.id + ' GET');
//   try {
//     let menuItem = await menuItemsDAL.getMenuItemById(req.params.id); 
//     if(DEBUG) console.table(menuItem);
//     res.render('menuItem', {menuItem:menuItem});
//   } catch {
//     res.status(500);
//     res.render('500');
//   };
// });


// router.get('/menu-items/:id/edit', async (req, res) => {
//   if(DEBUG) console.log('ROUTE /login/menu-items ' + req.params.id + ' edit');
//   let menuItem = await menuItemsDAL.getMenuItemById(req.params.id) || []; 
//   res.render('menuItemPatch', {...menuItem[0]});
// });


// router.get('/menu-items/:id/delete', async (req, res) => {
//   if(DEBUG) console.log('ROUTE: /login/menu-items ' + req.params.id + ' DELETE');
//   let menuItem = await menuItemsDAL.getMenuItemById(req.params.id) || [];  
//   res.render('menuItemDelete', {...menuItem[0]});
// });


// router.post('/menu-items/', async (req, res) => {
//   if(DEBUG) console.log("menuItemsStaff.POST");
//   try {
//     await menuItemsDAL.addMenuItem(req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
//     res.redirect('/login/menu-items');
//   } catch (err){
//     res.status(500);
//     res.render('500');
//   } 
// });


// router.patch('/menu-items/:id/edit', async (req, res) => {
//     if(DEBUG) console.log('ROUTE /login/menu-items ' + req.params.id +  ' PATCH' );
//     try {
//       await menuItemsDAL.patchMenuItem(req.params.id, req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_url);
//       res.redirect('/login/menu-items');
//     } catch {
//       res.status = (500);
//       res.render('500');
//     }

// });

// router.delete('/menu-items/:id/delete', async (req, res) => {              if(DEBUG) console.log('MenuItems.DELETE: ' + req.params.id);
//   try {
//       await menuItemsDAL.deleteMenuItem(req.params.id);
//       res.redirect('/login/menu-items');
//   } catch {
//       res.status(500);
//       res.render('500');
//   }});

module.exports = router;