const express = require('express');
const router = express.Router();
//const loginDAL = require('../services/pg.login.dal');
const { registrationGetController, registrationPostController } = require('../controllers/registrationController');

router.get('/', registrationGetController);

router.post('/', registrationPostController);

module.exports = router;