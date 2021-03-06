const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

const keys = require('./config/keys');

// API Includes
const register = require('./api/register');
const login = require('./api/login');
const logout = require('./api/logout');
const addContact = require('./api/addContact');
const editContact = require('./api/editContact');
const deleteContact = require('./api/deleteContact');
const searchContacts = require('./api/searchContacts');
const getUserInfo = require('./api/getUserInfo');
const clever = require('./api/clever');

// MongoDB Client
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(() => console.log('Express: Connected to MongoDB Atlas'))
        .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => 
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

// Frontend Routes
app.use(express.static('./frontend/build'));
app.get('*', function(req, res)
{
	res.sendFile('./frontend/build/index.html', {root: __dirname});
});

// API Routes
app.use(register);
app.use(login);
app.use(logout);
app.use(addContact);
app.use(editContact);
app.use(deleteContact);
app.use(searchContacts);
app.use(getUserInfo);
app.use(clever);

app.listen(8000, () => console.log('Express: Server Started'));
