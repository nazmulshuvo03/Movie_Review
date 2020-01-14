import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signIn } from "../../store/actions/authAction";

class SignIn extends Component {
	state = {
		email: "",
		password: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		//console.log(this.props);
		this.props.signIn(this.state);
	};

	render() {
		//console.log(this.props);
		const { authError, auth } = this.props;

		if (auth.uid) {
			return <Redirect to="/" />;
		} else {
			return (
				<div className="signin-box center z-depth-5">
					<h3>Sign In</h3>
					<form onSubmit={this.handleSubmit}>
						<div className="input-field">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								onChange={this.handleChange}
							/>
						</div>
						<div className="input-field">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								onChange={this.handleChange}
							/>
						</div>
						<div className="input-field">
							<button className="btn waves-effect waves-light buttons_color z-depth-3">
								Sign In
							</button>
						</div>
						<div className="input-field">
							{authError ? <span>{authError}</span> : null}
						</div>
					</form>
					<div style={{ color: "#808080" }}>
						<p>email: test@email.com </p>
						<p>password: test1234</p>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	//console.log(state);
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: creds => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
