import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AddContact from '../components/AddContact';

const fetch = require('node-fetch');


// TODO: Make Pretty
const AddContactPage = data =>
{
	return (
		<div>
			<AddContact />
		</div>
	);
};

export default AddContactPage;
