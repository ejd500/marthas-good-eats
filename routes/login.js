const express = require('express');
const router = express.Router();
const loginDAL = require('../services/pg.login.dal');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /login');
  res.render('login', { error: null });
});

router.post('/', async (req, res) => {
  if (DEBUG) console.log('ROUTE: /login (POST)');
  const { email, password } = req.body;

  try {
    const user = await loginDAL.getLoginByEmail(email);
    if (user.length != 0) {
      const storedPassword = user[0].password;
      const isStaff = user[0].is_staff;

      if (DEBUG)console.log('Stored Password:', storedPassword); 

      // Compare entered password with the stored hashed password using bcrypt
      const passwordMatch = await bcrypt.compare(password, storedPassword);

      if (DEBUG)console.log('Password Match:', passwordMatch); 

      if (passwordMatch) {
        // Passwords match, authentication successful
        req.session.user = {
          user_id: user[0].user_id,
          email: user[0].email,
          isStaff: user[0].is_staff,
        };

        if (DEBUG) console.log(req.session.user);

        if (isStaff) {
          res.redirect('/management');
          
        } else {
          res.redirect('/home');
        }
      } else {
        // Password does not match, authentication failed
        res.render('login', { error: 'Invalid Email or Password' });
      }
    } else {
      // User not found, authentication failed
      res.render('login', { error: 'Invalid Email or Password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).render('500');
  }
});


module.exports = router;