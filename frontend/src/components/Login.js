import React from 'react';

function Login()
{
	const doLogin = async event =>
	{
		event.preventDefault();
		alert('A thing happened.');
	};

	return (
		<div id="loginDiv">
			<form onSubmit={doLogin}>
				<span id="innder-title">Please Log In</span><br />
				<input type="text" id="loginName" placeholder="Username" /><br />
				<input type="password" id="loginPassword" placeholder="Password"/><br />
				<input type="submit" id="loginButton" class="buttons" value="Log In" onClick={doLogin}/>
			</form>
			<span id="loginResult"></span>
		</div>
	);
};

export default Login;
