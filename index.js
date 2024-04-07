if( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.urlencoded({ extended: true, }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const port = 3000;

global.DEBUG = true;

app.get('/', (req,res) =>{
    res.render('index.ejs');
});

const registrationRouter = require('./routes/registration.js');
app.use('/registration', registrationRouter);

const managementRouter = require('./routes/management.js');
app.use('/management', managementRouter);

const customerHomeRouter = require('./routes/customer/home.js');
app.use('/home', customerHomeRouter);

const customerMenuItemsRouter = require('./routes/customer/menuItems.js');
app.use('/menu-items', customerMenuItemsRouter);

const customerLogoutRouter = require('./routes/customer/logout.js');
app.use('/logout', customerLogoutRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const apiMenuItemsRouter = require('./routes/api/apiMenuItems');
app.use('/api/menu-items', apiMenuItemsRouter);


app.use((req, res) => {
    res.status(404).render('404');
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
