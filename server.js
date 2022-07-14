// import the required libraries
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const cors = require('cors');
var methodOverride = require('method-override');
var session = require('express-session');

// random id for system
const secret_id = crypto.randomBytes(16).toString("hex");

// construct content security policy
var policy = {
	defaultPolicy: {
		"default-src": ["self"],
		//"img-src": ["static.imageserver.com"]
	}
};

// routing via express
const app = express();

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

// prevent browser from storing page
app.use(nocache());

// prevent HTTP GET mutation
app.use(methodOverride("X-HTTP-Method-Override"));

// create a session, and let this session use the global secret
app.use(session({
	secret: secret_id,
	resave: false,
	saveUninitialized: true,
	key: 'sessionId',
	cookie: {
		httpsOnly: false,
		secure: true
	}
}));

// produces a cors middleware route to localhost for express
var corsOptions = {
	origin: "https://localhost:3000"
};

// use cors to provide connection config
app.use(cors(corsOptions));

// parse req of type json
app.use(bodyParser.json());

// utilize sequelize for the DB model
const db = require('./app/models');
db.sequelize.sync({force:false}).then(() => {
	console.log("Dropping and resyncing DB.");
});


// initialize express routes for database controllers
require("./backend/routes/user_routes.js")(app);
require("./backend/routes/compound_routes.js")(app);


console.log("express routes loaded");

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`);
});
