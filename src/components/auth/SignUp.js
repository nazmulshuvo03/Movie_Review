import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signUp } from '../../store/actions/authAction';

class SignIn extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.state, this.props);
		this.props.signUp(this.state);
	};

	render() {
		const { auth, authError } = this.props;

		if (auth.uid) {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="container red-text text-accent-4 center">
					<h3>Sign Up</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field">
							<label htmlFor="firstName">First Name</label>
							<input type="text" id="firstName" onChange={this.handleChange} />
						</div>
						<div className="input-field">
							<label htmlFor="lastName">Last Name</label>
							<input type="text" id="lastName" onChange={this.handleChange} />
						</div>
						<div className="input-field">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" onChange={this.handleChange} />
						</div>
						<div className="input-field">
							<label htmlFor="password">Password</label>
							<input type="password" id="password" onChange={this.handleChange} />
						</div>
						<div className="input-field">
							<button className="btn waves-effect waves-light red accent-4 z-depth-3">Sign Up</button>
						</div>
						<div className="input-field">{authError ? <span>{authError}</span> : null}</div>
					</form>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
