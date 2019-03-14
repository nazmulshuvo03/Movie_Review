import React, { Component } from 'react';

class SignIn extends Component {
	state = {};
	render() {
		return (
			<div className="container">
				<h3>Sign In</h3>
				<form>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" />
					</div>
					<div className="input-field">
						<button className="btn">Sign In</button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
