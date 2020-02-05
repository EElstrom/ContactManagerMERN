import React from 'react';
import './Login.css';
import './Home.css'

function Contact(contact)
{
	return (
		<div key={contact.key}>
			<div id="contactContainer">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
				<div className="contactHeader">{contact.firstname} {contact.lastname}</div>
				<div className="contactInfo">{contact.phoneNumber}</div>
				<div className="contactInfo">{contact.email}</div>
				<div className="contactInfo">ACME, Inc</div>
				<div className="contactInfo">Project Manager</div>
			</div>
		</div>
	);
};

export default Contact;
