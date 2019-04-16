import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
	const { auth, profile } = props;
	const links = auth.uid ? <SignedInLinks profile={profile} auth={auth} /> : <SignedOutLinks />;
	return (
		<nav className="nav-wrapper red darken-3">
			<div className="container">
				<Link to="/" className="brand-logo main-title">
					Movie Review
				</Link>
				{links}
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	};
};

export default connect(mapStateToProps)(Navbar);
