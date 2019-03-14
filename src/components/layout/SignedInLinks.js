import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/new">New Review</NavLink>
			</li>
			<li>
				<NavLink to="/">Sign Out</NavLink>
			</li>
			<li>
				<NavLink to="/">
					<div className="btn btn-floating">AA</div>
				</NavLink>
			</li>
		</ul>
	);
};

export default SignedOutLinks;
