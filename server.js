const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fetch = require("node-fetch");
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://devong:Shuckle@contactmanager-c6p1t.mongodb.net/test';
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use((req, res, next) =>
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

// API Endpoint for registering a new user account with the database
	// Input :    {"username":STRING, "password":STRING, "firstname":STRING, "lastname":STRING, "email":STRING}
	// Response : {"result:STRING, "error":STRING}
app.post('/api/register', async(req, res, next) =>
{
	function usernameIsValid(username)
	{
		return username != null && username.length > 4;
	}

	// Password validity will be checked before making the API request
	function passwordIsValid(password)
	{
		return true;//password != null && password.length > 4;;
	}

	function emailIsValid(email)
	{
		return true;
	}

	try
	{
		const {username, password, firstname, lastname, email} = req.body;

		// Check validity
		if (!usernameIsValid(username))
		{
			var ret = {result:'failure', error:'invalid username'};
			res.status(200).json(ret);
			return;
		}
		if (!passwordIsValid(password))
		{
			var ret = {result:'failure', error:'invalid password'};
			res.status(200).json(ret);
			return;
		}
		if (!emailIsValid(email))
		{
			var ret = {result:'failure', error:'invalid email'};
			res.status(200).json(ret);
			return;
		}


		const db = client.db('contact_manager');

		// Make sure username is not taken
		const results = await db.collection('Users').find({username:username}).toArray();
		if (results.length > 0)
		{
			var ret = {result:'failure', error:'username taken'};
			res.status(200).json(ret);
		}
		else
		{
			// Register the new user
			await db.collection('Users').insertOne({username:username, password:password, firstname:firstname, lastname:lastname, email:email});

			var ret = {result:'success', error:''};
			res.status(200).json(ret);
		}
	}
	catch (e)
	{
		console.error(e);
		var ret = {result:'failure', error:e.message};
		res.status(200).json(ret);
	}
});

// API Endpoint for logging in as an existing user
	// Input :    {"username":STRING, "password":STRING}
	// Response : {"result:STRING, "error":STRING, "firstname":STRING, "lastname":STRING}
app.post('/api/login', async(req, res, next) =>
{
	try
	{
		const {username, password} = req.body;

		const db = client.db('contact_manager');

		// Attempt to login by searching the database for the correct username/password combo
		const results = await db.collection('Users').find({username:username, password:password}).toArray();
		if (results.length > 0)
		{
			var ret = {result:'success', error:'', firstname:results[0].firstname, lastname:results[0].lastname};
			res.status(200).json(ret);
		}
		else
		{
			var ret = {result:'failure', error:'wrong login'};
			res.status(200).json(ret);
		}
	}
	catch (e)
	{
		console.error(e);
		var ret = {result:'failure', error:e.message};
		res.status(200).json(ret);
	}	
});

// API Endpoint for communicating with cleverbot
	// Input :    {"message":STRING}
	// Response : {"reply":STRING, "error":STRING}
app.post('/api/clever', async(req, res, next) =>
{
	try
	{
		// Get message from Input JSON
		const {message} = req.body;

		// DON'T STEAL MY API KEY :)
		var API_KEY = 'CC8sn1crKoZ2OM_GyrgyW71r-kg';

		// A key for the active conversation with cleverbot
		var cleverstate = '';

		// Fetch a response from cleverbot
		const response = await fetch('http://www.cleverbot.com/getreply?' +
			                         'key=' + API_KEY +
			                         '&input=' + encodeURIComponent (message) +
			                         '&cs=' + cleverstate +
			                         '&callback=ProcessReply');

		// Send the reply back to the client
		var ret = {reply:JSON.parse(await response.text()).output, error:''};
		res.status(200).json(ret);
	}
	catch (e)
	{
		console.error(e);
		var ret = {reply:'Failed to get Reply', error:e.message};
		res.status(200).json(ret);
	}
});

app.get("*", (req, res) =>
{
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(8000);
