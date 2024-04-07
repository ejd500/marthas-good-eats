const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal');
const loginDAL = require('../../services/pg.login.dal');

router.get('/', async (req, res) => {
  if(DEBUG) console.log('ROUTE: /logout');
  res.render('customerLogout.ejs');
});

module.exports = router;