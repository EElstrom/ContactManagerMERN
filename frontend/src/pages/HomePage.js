import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ContactList from '../components/ContactList';

const HomePage = data =>
{
	return (
		<div>
			<Link to="/AddContact">Add a new Contact</Link><br />
			<ContactList />
		</div>
	);
};

export default HomePage;
