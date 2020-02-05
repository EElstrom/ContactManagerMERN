const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

router.post('/api/clever', async(req, res, next) =>
{
	console.log('Express: POST /api/clever');

	const authToken = req.cookies.session;

	jwt.verify(authToken, keys.secretOrKey, async function(err, decoded)
	{
		if (err || !decoded)
		{
			res.status(401).json({success: false, errors: 'access denied: please login'});
		}
		else
		{
			// Get message from Input JSON
			const {message, cs} = req.body;

			// A key for the active conversation with cleverbot
			var cleverstate = (cs) ? cs : '';

			// Fetch a response from cleverbot
			const response = await fetch('http://www.cleverbot.com/getreply?' +
							             'key=' + keys.cleverKey +
							             '&input=' + encodeURIComponent (message) +
							             '&cs=' + cleverstate +
							             '&callback=ProcessReply').then(response => {return response.json()});

			// Send the reply back to the client
			res.status(200).json({success: true, reply: response.output, cs: response.cs});
		}
	});
});

module.exports = router;
