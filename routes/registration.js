const express = require('express');
const router = express.Router();
const loginDAL = require('../services/pg.login.dal');

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /registration');
    res.render('registration.ejs');
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /registration (POST)');
    const { first_name, last_name, email, password, isStaff} = req.body;
    console.log(isStaff);

    try {
        await loginDAL.createUser(first_name, last_name, email, password, isStaff);
        res.render('thank-you.ejs');
    } catch (error){
        console.log(error);
        res.render('500.ejs', {error: error.detail});
    }
});

module.exports = router;