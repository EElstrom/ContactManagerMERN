const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

router.post('/api/getUserInfo', function(req, res, next)
{
	console.log('Express: POST /api/getUserInfo');

	jwt.verify(req.headers.authorization, keys.secretOrKey, function(err, user)
	{
		if (err || !user)
		{
			res.status(401).json({success: false, errors: 'access denied: please login'});
		}
		else
		{
			res.status(200).json({
			  success: true,
 			  username: user.username,
			  firstname: user.firstname,
			  lastname: user.lastname,
			  email: user.email
			});
		}
	});
});

module.exports = router;
