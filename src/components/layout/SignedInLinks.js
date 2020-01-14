import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../store/actions/authAction";

const SignedInLinks = props => {
	//console.log(props)
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
				<a href="https://github.com/nazmulshuvo03/Movie_Review">
					Source
				</a>
			</li>
			<li className="initials_area">
				<NavLink to={"/timeline/" + props.auth.uid}>
					<div className="btn btn-floating initials_button">
						{props.profile.initials}
					</div>
				</NavLink>
			</li>
		</ul>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
