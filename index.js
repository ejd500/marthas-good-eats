if( process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('Images'));
app.use(express.urlencoded({ extended: true, }));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

const port = 3000;

global.DEBUG = true;

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated
    res.redirect('/login');
  }
};

function isStaff(req, res, next) {
  if (req.session && req.session.user && req.session.user.isStaff) {
    // User is authenticated and is a staff member
    next();
  } else {
    // User is not a staff member
    res.status(403).render('403'); 
  }
};

app.get('/', (req,res) =>{
  res.render('index.ejs');
});

const registrationRouter = require('./routes/registration.js');
app.use('/registration', registrationRouter);

const managementRouter = require('./routes/management.js');
app.use('/management', isAuthenticated, isStaff, managementRouter);

const customerHomeRouter = require('./routes/customer/home.js');
app.use('/home', isAuthenticated, customerHomeRouter);

const customerMenuItemsRouter = require('./routes/customer/menuItems.js');
app.use('/menu-items', isAuthenticated, customerMenuItemsRouter);

const customerLogoutRouter = require('./routes/customer/logout.js');
app.use('/logout', isAuthenticated, customerLogoutRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const apiMenuItemsRouter = require('./routes/api/apiMenuItems');
app.use('/api/menu-items', isAuthenticated,apiMenuItemsRouter);


app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


