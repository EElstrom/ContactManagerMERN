import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App()
{
	return (
		<Router>
			<Switch>
				<Route path="/login" exact>
					<LoginPage />
				</Route>
				<Route path="/register" exact>
					<RegisterPage />
				</Route>
				<Redirect to="/login" />
			</Switch>
		</Router>
	);
}

export default App;
