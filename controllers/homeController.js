DEBUG = true;

async function homeController (req, res) {
    if(DEBUG) console.log('ROUTE: /home');
    res.render('customerHome.ejs');
}

module.exports = {homeController};