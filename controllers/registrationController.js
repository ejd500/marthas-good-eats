DEBUG = true;

const loginDAL = require('../services/pg.login.dal');

async function registrationGetController(req, res) {
    if(DEBUG) console.log('ROUTE: /registration');
    res.render('registration.ejs');
};

async function registrationPostController(req, res){
    if(DEBUG) console.log('ROUTE: /registration (POST)');
    const { first_name, last_name, email, password, isStaff} = req.body;
    console.log(isStaff);

    try {
        await loginDAL.createUser(first_name, last_name, email, password, isStaff);
        res.render('thank-you.ejs');
    } catch (error){
        console.log(error);
        res.render('500.ejs', {error: error});
    }
}

module.exports = {registrationGetController, registrationPostController};