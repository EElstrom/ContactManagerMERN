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

	if (isEmpty(data.id) || validator.isEmpty(data.id))
		errors.id = 'missing id';

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/editContact', function(req, res, next)
{
	console.log('Express: POST /api/editContact');

	const authToken = req.cookies.session;

	jwt.verify(authToken, keys.secretOrKey, function(err, user)
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
				const update = {};

				if (req.body.firstname)
					update.firstname = req.body.firstname;
				if (req.body.lastname)
					update.lastname = req.body.lastname;
				if (req.body.phoneNumber)
					update.phoneNumber = req.body.phoneNumber;
				if (req.body.email)
					update.email = req.body.email;
				if (req.body.address)
					update.address = req.body.address;
				if (req.body.company)
					update.company = req.body.company;
				if (req.body.title)
					update.title = req.body.title;

				Contact.findOneAndUpdate({_id: req.body.id, userId: user.id}, update, function(err, contact)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to edit contact'});
					}
					else
					{
						res.status(200).json({success: true});
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
