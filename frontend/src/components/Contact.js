import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './Home.css'

const fetch = require('node-fetch');

function Contact()
{
	return (
		<div>
			<div id="contactContainer">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
				<div class="contactHeader">John Smith</div>
				<div class="contactInfo">(312) 645-9780</div>
				<div class="contactInfo">jsmith@gmail.com</div>
				<div class="contactInfo">ACME, Inc</div>
				<div class="contactInfo">Project Manager</div>
			</div>
		</div>
	);
};

export default Contact;
