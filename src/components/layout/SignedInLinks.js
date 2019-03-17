import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../store/actions/authAction';

const SignedInLinks = (props) => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/new">New Review</NavLink>
			</li>
			<li>
				<a href="/" onClick={props.signOut}>
					Sign Out
				</a>
			</li>
			<li>
				<NavLink to="/">
					<div className="btn btn-floating red accent-4 z-depth-3">{props.profile.initials}</div>
				</NavLink>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
