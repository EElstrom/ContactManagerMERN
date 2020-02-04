import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage'

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
				<Route path="/home" exact>
					<HomePage />
				</Route>
				<Route path="/test" exact>
					<TestPage />
				</Route>
				<Redirect to="/login" />
			</Switch>
		</Router>
	);
}

export default App;
