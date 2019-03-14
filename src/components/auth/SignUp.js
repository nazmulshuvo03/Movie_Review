import React, { Component } from 'react';

class SignIn extends Component {
	state = {};
	render() {
		return (
			<div className="container">
				<h3>Sign Up</h3>
				<form>
					<div className="input-field">
						<label htmlFor="firstname">First Name</label>
						<input type="text" id="firstname" />
					</div>
					<div className="input-field">
						<label htmlFor="lastname">Last Name</label>
						<input type="text" id="lastname" />
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" />
					</div>
					<div className="input-field">
						<button className="btn">Sign Up</button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
