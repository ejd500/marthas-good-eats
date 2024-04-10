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
        
        // Set email in session
        req.session.email = email;

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

module.exports = router;