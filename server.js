let express    = require('express');        // call express
let app        = express();                 // define our app using express
// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// **************************************************************************************************
// Session = définit la session privée (permet de rester sur les pages de ma session)
var session = require('express-session');

app.use(session({
    secret : 'my secret',
    resave : false,
    saveUninitialized : false
})
);
// ***********************************************************************************************************
// Cookie
var cookieParser = require ('cookie-Parser')
app.use(cookieParser())
app.use(cookieParser());

//************************************************************************************************** */
// dljknazdioani
//*************************************************************************************************** */
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrictitto the requireddomain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if(req.method== 'OPTIONS') {res.status(200).end();
  } 
  else { next(); }
});

//**************************************************************************************************** */
// Import routes
let router = require('./routes');
app.use('/', router);

// Launch app to listen to specified port
var port = 8000
app.listen(port, function () { console.log('Running server on port ' + port); })