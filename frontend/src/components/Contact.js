import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import './home.css'

const fetch = require('node-fetch');

function Contact()
{
	return (
		<div>
			<div id="container">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Font+Name"></link>
				<div id="header">
					<p>John Smith</p>
				</div>
				<div id="contactInfo">
					<p>(312) 645-9780</p>
					<p>jsmith@gmail.com</p>
					<p>ACME, Inc</p>
					<p>Project Manager</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
