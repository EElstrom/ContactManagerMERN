import React from 'react';
import './Login.css';
import './Home.css';

import AddContact from './AddContact';

const fetch = require('node-fetch');

// Tod Howard: "It just works."

class Contact extends React.Component
{
	key = 0;
	id = '';
	firstname = '';
	lastname = '';
	phoneNumber = '';
	email = '';
	company = '';
	title = '';

	constructor(props)
	{
		super(props);

		this.key = props.key;
		this.id = props._id;
		this.firstname = props.firstname;
		this.lastname = props.lastname;
		this.phoneNumber = props.phoneNumber;
		this.email = props.email;
		this.company = props.company;
		this.title = props.title;
	}

	async editContact()
	{
		// API Call
		const response = await fetch('api/editContact', {
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    id: this.id,
		    firstname: this.firstname,
		    lastname: this.lastname,
		    phoneNumber: this.phoneNumber,
		    email: this.email,
		    company: this.company,
		    title: this.title
		  })
		}).then(response => {return response.json()});

		this.props.updateContactList();
	}

	async deleteContact()
	{
		if(window.confirm('Are you sure?'))
		{
			// API Call
			const response = await fetch('api/deleteContact', {
			  method: 'POST',
			  credentials: 'same-origin',
			  headers: {'Content-Type': 'application/json'},
			  body: JSON.stringify({
				id: this.id
			  })
			}).then(response => {return response.json()});
		}

		this.props.updateContactList();
	}

	render()
	{
		return (
			<div key={this.key}>
				<div id="contactContainer">
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
					<div className="contactHeader">{this.firstname} {this.lastname}</div>
					<div className="contactInfo">{this.phoneNumber}</div>
					<div className="contactInfo">{this.email}</div>
					<div className="contactInfo">{this.company}</div>
					<div className="contactInfo">{this.title}</div>
					<button id ='kill' style={{margin:'5%', backgroundColor:'#4DA761', color:'#FFFFFF', alignSelf: 'flex-end'}} onClick={() => this.deleteContact()}> DELETE </button>
				</div>
			</div>
		);
	}
};

export default Contact;
