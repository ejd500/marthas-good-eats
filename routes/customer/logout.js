const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal');
const loginDAL = require('../../services/pg.login.dal');

router.get('/', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /logout');
  res.render('customerLogout.ejs');
});

router.post('/', async (req, res) => {
  if(DEBUG) console.log("customerLogout.POST");
  req.session.destroy();
  res.status(200).send("Logout Successful");
  if(DEBUG)console.log("Logout Successful");
});

module.exports = router;