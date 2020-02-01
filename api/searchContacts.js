const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');
const isEmpty = require('is-empty');

const keys = require('../config/keys');

const Contact = require('../models/Contact');

function validateInput(data)
{
	var errors = {};

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/searchContacts', function(req, res, next)
{
	console.log('Express: POST /api/searchContacts');

	jwt.verify(req.headers.authorization, keys.secretOrKey, function(err, user)
	{
		if (err || !user)
		{
			res.status(401).json({success: false, errors: 'access denied: please login'});
		}
		else
		{
			const validation = validateInput(req.body);

			if (validation.isValid)
			{
				Contact.find({userId: user.id}, function(err, arr)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to search contacts'});
					}
					else
					{
						res.status(200).json({success: true, contacts: arr});
					}
				});
			}
			else
			{
				res.status(400).json({success: false, errors: validation.errors})
			}
		}
	});
});

module.exports = router;
