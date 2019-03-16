import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
	return (
		<nav className="nav-wrapper">
			<div className="container">
				<Link to="/" className="brand-logo">
					Movie Review
				</Link>
				<SignedInLinks />
				<SignedOutLinks />
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Navbar);
