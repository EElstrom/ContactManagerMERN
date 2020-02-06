import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Contact from '../components/Contact';

const fetch = require('node-fetch');

const HomePage = data =>
{
	const [contactComponents, setComponents] = useState(null);

	var query = "";

	// Call this function to update contact components
	async function getContactComponents()
	{
		// API Call
		const response = await fetch('api/searchContacts', {
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    query: query,
		    sort_by: {lastname: 1}
		  })
		}).then(response => {return response.json()});

		var index;
		var contacts = [];
		for (index in response.contacts)
		{
			// Make contact components
			response.contacts[index].key = index;
			contacts.push(Contact(response.contacts[index]));
		}

		setComponents(contacts);
	}

	if (contactComponents == null)
		getContactComponents();

	return (
		<div>
			<Link to="/AddContact">Add a new Contact</Link><br />
			{contactComponents}
		</div>
	);
};

export default HomePage;
