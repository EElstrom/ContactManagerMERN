import React from 'react';

import Contact from '../components/Contact';
import RButtons from '../components/RButtons';
import '../components/Home.css';

const HomePage = () =>
{

	// TODO: Create initialization function that calls /api/searchContacts and then creates a contact
	//       component for each contact returned by the api. api will need authentication token from login
	function initialize()
	{
		const response = fetch('api/searchContacts', {
		  method: 'POST',
		  headers: {'Content-Type': 'application/json', 'Authorization': 'NEED_USER_API_TOKEN'},
		  body: JSON.stringify({})
		}).then(response => {return response.json()});

		console.log(response);

		var contact;
		for (contact in response.contacts)
		{
			// Make contact components
		}
	};

	// Call this function to update contact components
	initialize();

	return (
		<div>
			<Contact firstname='Justin' lastname='Miranda' phoneNumber='(123) 456-7890' email='bgates@msn.com'/>
			<RButtons class="rButtons"/>
		</div>
	);
};

export default HomePage;
