const express = require('express');
const router = express.Router();
//const loginDAL = require('../services/pg.login.dal');
//const bcrypt = require('bcrypt');
const {loginGetController, loginPostController} = require('../controllers/loginController');

router.get('/', loginGetController);

router.post('/', loginPostController);

module.exports = router;