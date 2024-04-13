const express = require('express');
const router = express.Router();
const menuItemsDAL = require('../../services/pg.menuItems.dal');
//const menuItemsDAL = require('../../services/m.menuItems.dal');
const fullTextDAL = require('../../services/pg.fulltext.dal');
//const fullTextDAL = require('../../services/m.fulltext.dal');

const { menuItemsController } = require('../../controllers/menuItemsController');

router.get('/', menuItemsController);

module.exports = router;

