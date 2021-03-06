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
				const query = (isEmpty(req.body.query)) ? "" : req.body.query;
				const firstname = (isEmpty(req.body.firstname)) ? "" : req.body.firstname;
				const lastname = (isEmpty(req.body.lastname)) ? "" : req.body.lastname;
				const phoneNumber = (isEmpty(req.body.phoneNumber)) ? "" : req.body.phoneNumber;
				const email = (isEmpty(req.body.email)) ? "" : req.body.email;
				const address = (isEmpty(req.body.address)) ? "" : req.body.address;
				const company = (isEmpty(req.body.company)) ? "" : req.body.company;
				const title = (isEmpty(req.body.title)) ? "" : req.body.title;

				var request = {};

				if (query)
				{
					request = {
					  $or: [
					    {firstname: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {lastname: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {phoneNumber: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {email: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {address: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {company: {$regex: '.*' + query + '.*', $options: 'i'}},
					    {title: {$regex: '.*' + query + '.*', $options: 'i'}}
					  ]
					};
				}
				else
				{
					if (firstname)
						request.firstname = {$regex: '.*' + firstname + '.*', $options: 'i'};
					if (lastname)
						request.lastname = {$regex: '.*' + lastname + '.*', $options: 'i'};
					if (phoneNumber)
						request.phoneNumber = {$regex: '.*' + phoneNumber + '.*', $options: 'i'};
					if (email)
						request.email = {$regex: '.*' + email + '.*', $options: 'i'};
					if (address)
						request.address = {$regex: '.*' + address + '.*', $options: 'i'};
					if (company)
						request.company = {$regex: '.*' + company + '.*', $options: 'i'};
					if (title)
						request.title = {$regex: '.*' + title + '.*', $options: 'i'};
				}

				request.userId = user.id;
				Contact.find(request, function(err, arr)
				{
					if (err)
					{
						console.log(err);
						res.status(500).json({success: false, errors: 'failed to search contacts'});
					}
					else
					{
						var contacts = [];
						for (i = 0; i < arr.length; i++)
						{
							var contact = JSON.parse(JSON.stringify(arr[i]));
							delete contact.userId;
							delete contact.__v;
							contacts.push(contact);
						}
						res.status(200).json({success: true, contacts: contacts});
					}
				}).sort((isEmpty(req.body.sort_by)) ? {lastname: 1} : req.body.sort_by);
			}
			else
			{
				res.status(400).json({success: false, errors: validation.errors})
			}
		}
	});
});

module.exports = router;
