const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fetch = require("node-fetch");
const app = express();

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
	// Input JSON
	// {
	//   "username":STRING,
	//   "password":STRING,
	//   "firstName":STRING,
	//   "lastname":STRING,
	//   "emailAddress":STRING
	// }

	// Response JSON
	// {
	//   "result:STRING,
	//   "error":STRING
	// }
app.post('/api/register', async(req, res, next) =>
{

});

// API Endpoint for logging in as an existing user
	// Input JSON
	// {
	//   "username":STRING,
	//   "password":STRING
	// }

	// Response JSON
	// {
	//   "result:STRING,
	//   "error":STRING
	// }
app.post('/api/login', async(req, res, next) =>
{

});

// API Endpoint for communicating with cleverbot
	// Input JSON
	// {
	//   "message":STRING
	// }

	// Response JSON
	// {
	//   "reply":STRING,
	//   "error":STRING
	// }
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
