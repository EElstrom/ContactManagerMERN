import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './Home.css'

const fetch = require('node-fetch');

// TODO: Convert to 'Factory' function that takes contact details as input and returns a contact component
function Contact(contact)
{
	var name = 'Placeholder Name'
	var number = '(312) 645-9780'
	var email = 'jsmith@gmail.com'
	var company = 'ACME, Inc'
	var role =  'Project Manager'

	return (
		<div>
			<div id="contactCard">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
				<div class="contactHeader">{contact.firstname} {contact.lastname}</div>
				<div class="contactInfo">{contact.phoneNumber}</div>
				<div class="contactInfo">{contact.email}</div>
				<div class="contactInfo">ACME, Inc</div>
				<div class="contactInfo">Project Manager</div>
			</div>
		</div>
	);
};

export default Contact;
