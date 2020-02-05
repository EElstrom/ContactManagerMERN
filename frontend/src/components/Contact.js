import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import './home.css'

const fetch = require('node-fetch');

function Contact()
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
				<div class="contactHeader">{name}</div>
				<div class="contactInfo">{number}</div>
				<div class="contactInfo">{email}</div>
				<div class="contactInfo">{company}</div>
				<div class="contactInfo">{role}</div>
			</div>
		</div>
	);
};

export default Contact;
