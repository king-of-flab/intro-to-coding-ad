const mongoose = require('mongoose');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');

const sendEnquiry = require('./controllers/controller')


const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/codingAd'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('connected successfully');
  },
  function (err) {
    console.log(err);
  }
);

const app = express();

app.use(session({
  store: new MongoStore({
    url: url
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

app.use(express.static('public'));
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  app.locals.flash = req.flash('msg');
  next();
})

app.get('/', function (req, res) {
    res.render('index')
  })

app.get('/about', function (req, res) {
    res.render('about')
  })

app.get('/faq', function (req, res) {
    res.render('faq')
  })

app.get('/contact', function (req, res) {
      res.render('contact')
    })

app.post('/enquiry', sendEnquiry)

const port = process.env.PORT || 2000  //  IMPORTANT! DONT FORGET TO UNCOMMENT AND MOVE TO THE FRONT
app.listen(port, function () {
  console.log(`express is running on ${port}`);
})
