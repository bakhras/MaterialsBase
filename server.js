// import the required libraries
const fs = require('fs');
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const nocache = require('nocache');
const favicon = require('serve-favicon');
const path = require('path');
const nosniff = require('dont-sniff-mimetype');
const cookieParser = require('cookieparser');
const bodyParser = require('body-parser');
const cors = require('cors');
var csrf = require('csurf');
var esapi = require('node-esapi');
var methodOverride = require('method-override');
var session = require('express-session');

// make https work
/*
const privkey = fs.readFileSync('/etc/letsencrypt/live/dyn243.research1-99.ndsu.nodak.edu/privkey.pem', 'utf8');
const cert = fs.readFileSync('/etc/letsencrypt/live/dyn243.research1-99.ndsu.nodak.edu/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dyn243.research1-99.ndsu.nodak.edu/chain.pem', 'utf8');
const credentials = {
	key: privkey,
	cert: cert,
	ca: ca
};
*/

// random id for system
const secret_id = crypto.randomBytes(16).toString("hex");

// construct content security policy
var policy = {
	defaultPolicy: {
		"default-src": ["self"],
		//"img-src": ["static.imageserver.com"]
	}
};

// middleware session cookie
var crsfProtection = csrf({ cookie: true });

// routing via express
const app = express();

// TODO serve a favicon for the page
//app.use(favicon(path.join(__dirname, "./static/favicon.ico")));

// more secure options for HTTP headers via helmet
app.use(helmet());

// mislead automated profiling
app.use(helmet.hidePoweredBy({
	setTo: "PHP 4.2.0"
}));


// prevent clickjacking
app.use(helmet.frameguard());

// only allow resources from whitelisted domains
app.use(helmet.contentSecurityPolicy(policy));

// TODO use HTTPS only
app.use(helmet.hsts());

// prevent browser from storing page
app.use(nocache());

// prevent HTTP GET mutation
app.use(methodOverride("X-HTTP-Method-Override"));

// TODO basic XSS req forgery protection
//app.use(cookieParser());
//app.use(crsfProtection(crsfProtection));

// create a session, and let this session use the global secret
app.use(session({
	secret: secret_id,
	resave: false,
	saveUninitialized: true,
	key: 'sessionId',
	cookie: {
		httpsOnly: true,
		secure: true
	}
}));

// produces a cors middleware route to localhost for express
var corsOptions = {
	origin: "http://localhost:8081"
};

// use cors to provide connection config
app.use(cors(corsOptions));

// parse req of type json
app.use(bodyParser.json());

// serve static images
//app.use(express.static(__dirname, {dotfiles: 'allow' } ));
app.use(express.static(__dirname + '/static'));

// simple route
app.get("/", (req,res) => {
	res.sendFile(path.join(__dirname, '/static/index.html'));
});

// utilize sequelize for the DB model
const db = require('./app/models');
db.sequelize.sync({force:true}).then(() => {
	console.log("Dropping and resyncing DB.");
});


// initialize express routes for database controllers
require("./app/routes/user_routes.js")(app);
require("./app/routes/compound_routes.js")(app);


// set port, listen for requests
//const httpsServer = https.createServer(credentials, app);
const PORT = 8080;
//httpsServer.listen(PORT, () => {
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`);
});
