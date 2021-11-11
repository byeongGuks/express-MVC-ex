const express = require("express");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const morgan = require("morgan");
const controller = require("./controller/index.js");
const path = require("path");
const { MODE, SESSION_SECRET } = process.env;

const app = express();
const port = 3001; // temporary

app.set('views', path.join(__dirname, '../views/'));
app.set('view engine', 'pug');

app.use(express.static('public')); //정적 폴더 만들기
//app.use('/', express.static(`${__dirname}/../public`));
app.use(morgan("short")); // logging

app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new FileStore()
}));

app.use('/', controller);

//todo : app.use(errorhandler)
app.use(function(err, req, res, next) {
	console.error(err);
});

module.exports = app;
