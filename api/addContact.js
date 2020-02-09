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
	var fieldCount = 0;

	if (!isEmpty(data.firstname) && !validator.isEmpty(data.firstname))
		fieldCount++;
	if (!isEmpty(data.lastname) && !validator.isEmpty(data.lastname))
		fieldCount++;
	if (!isEmpty(data.phoneNumber) && data.phoneNumber.length > 0 && !validator.isEmpty(data.phoneNumber[0]))
		fieldCount++;
	if (!isEmpty(data.email) && data.email.length > 0 && !validator.isEmpty(data.email[0]))
		fieldCount++;
	if (!isEmpty(data.address) && data.address.length > 0 && !validator.isEmpty(data.address[0]))
		fieldCount++;
	if (!isEmpty(data.company) && !validator.isEmpty(data.company))
		fieldCount++;
	if (!isEmpty(data.title) &&  !validator.isEmpty(data.title))
		fieldCount++;

	if (fieldCount < 1)
		errors.fieldCount = 'request must include at least one contact detail';

	return {errors, isValid: isEmpty(errors)};
};

router.post('/api/addContact', function(req, res, next)
{
	console.log('Express: POST /api/addContact');

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
				const newContact = new Contact({
				  userId: user.id,
				  firstname: req.body.firstname,
				  lastname: req.body.lastname,
				  phoneNumber: req.body.phoneNumber,
				  email: req.body.email,
				  address: req.body.address,
				  company: req.body.company,
				  title: req.body.title
				});

				Contact.create(newContact, function(err, contact)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to register'});
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
