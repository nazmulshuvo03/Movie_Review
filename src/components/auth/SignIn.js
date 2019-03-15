import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../store/actions/authAction';

class SignIn extends Component {
	state = {
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
		console.log(this.props);
		this.props.signIn(this.state);
	};

	render() {
		//console.log(this.props);
		const { authError } = this.props;
		return (
			<div className="container">
				<h3>Sign In</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange} />
					</div>
					<div className="input-field">
						<button className="btn">Sign In</button>
					</div>
					<div className="input-field">{authError ? <span>{authError}</span> : null}</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		authError: state.auth.authError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
