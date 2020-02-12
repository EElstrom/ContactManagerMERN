import React from 'react';
import './Login.css';
import './Home.css';

const fetch = require('node-fetch');

class Contact extends React.Component
{

	constructor(props)
	{
		super(props);

		this.key = (props.key) ? props.key : 0;
		this.id = (props._id) ? props._id : 0;
		this.firstname = (props.firstname) ? props.firstname : '';
		this.lastname = (props.lastname) ? props.lastname : '';
		this.phoneNumber = (props.phoneNumber) ? props.phoneNumber : '';
		this.email = (props.email) ? props.email : '';
		this.company = (props.company) ? props.company : '';
		this.title = (props.title) ? props.title : '';
	}

	async editContact()
	{
		// API Call
		await fetch('api/editContact', {
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
			await fetch('/api/deleteContact', {
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
<<<<<<< Updated upstream
			<div key={this.key} style={{height: '370px'}}>
=======
			<div key={this.key}>
>>>>>>> Stashed changes
				<div id="contactCard">
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:900"></link>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bree+Serif"></link>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"></link>
					<div className="contactHeader">{this.firstname} {this.lastname}</div>
					<div className="contactInfo">{this.phoneNumber}</div>
					<div className="contactInfo">{this.email}</div>
					<div className="contactInfo">{this.company}</div>
					<div className="contactInfo">{this.title}</div>
				</div>
				<div>
					<button id ='edit' style={{backgroundColor:'#4DA761', color:'#FFFFFF', marginLeft: '70%'}} onClick={() => this.props.toggleEditContact(this.props)}> EDIT </button>
					<button id ='kill' style={{backgroundColor:'#4DA761', color:'#FFFFFF', marginLeft: '0%'}} onClick={() => this.deleteContact()}> DELETE </button>
				</div>
			</div>
		);
	}
};

export default Contact;
