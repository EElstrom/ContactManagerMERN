import React, { useState } from 'react';

import Contact from '../components/Contact';

const fetch = require('node-fetch');

const HomePage = () =>
{
	const [contactComponents, setComponents] = useState(null);

	// Call this function to update contact components
	async function getContactComponents()
	{
		// TODO: Implement User stored token authentication
		var devon_auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzVmMDg5OGVkZTc5NWQ3Y2ZlZTgyZCIsInVzZXJuYW1lIjoiZGV2b25nIiwiZmlyc3RuYW1lIjoiRGV2b24iLCJsYXN0bmFtZSI6IkdhZGFyb3dza2kiLCJlbWFpbCI6ImRldm9uLmdhZGFyb3dza2lAa25pZ2h0cy51Y2YuZWR1IiwiaWF0IjoxNTgwODYyNzQ0LCJleHAiOjE2MTI0MTk2NzB9.DwnJWbMFVK2Fb_j3Io5CdCCNrf77M88POFTuVyXMR_M';

		// API Call
		const response = await fetch('api/searchContacts', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json', 'Authorization': devon_auth_token},
		  body: JSON.stringify({})
		}).then(response => {return response.json()});

		var index;
		var contacts = [];
		for (index in response.contacts)
		{
			// Make contact components
			contacts.push(Contact(response.contacts[index]));
		}


		setComponents(contacts);
	}

	if (contactComponents == null)
		getContactComponents();

	return (
		<div>
			{contactComponents}
		</div>
	);
};

export default HomePage;
