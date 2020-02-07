import React from 'react';
import './Login.css';
import './Home.css';

import Contact from '../components/Contact';

const fetch = require('node-fetch');

class ContactList extends React.Component
{
	contacts;

	constructor(props)
	{
		super(props);

		this.loadContacts = this.loadContacts.bind(this);

		this.loadContacts();
	}

	async loadContacts()
	{
		this.contacts = [];

		// API Call
		const response = await fetch('api/searchContacts', {
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    query: '',
		    sort_by: {lastname: 1}
		  })
		}).then(response => {return response.json()});

		var index;
		for (index in response.contacts)
		{
			// Make contact components
			const contact = response.contacts[index];
			contact.key = index;
			contact.updateContactList = this.loadContacts;
			this.contacts.push(new Contact(contact));
		}

		this.forceUpdate();
	}

	render()
	{
		const components = [];

		var index;
		for (index in this.contacts)
			components[index] = this.contacts[index].render();

		return (
			<div>{components}</div>
		);
	}
};

export default ContactList;
