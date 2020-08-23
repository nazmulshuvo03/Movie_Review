import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../store/actions/authAction";

const SignedInLinks = (props) => {
    //console.log(props)
    return (
        <ul className="right">
            <li>
                <NavLink to="/new" className="common_color">
                    New Review
                </NavLink>
            </li>
            <li>
                <a href="/" onClick={props.signOut} className="common_color">
                    Sign Out
                </a>
            </li>
            <li>
                <a
                    href="https://github.com/nazmulshuvo03/Movie_Review"
                    className="common_color"
                >
                    Source
                </a>
            </li>
            <li className="initials_area">
                <NavLink
                    to={"/timeline/" + props.auth.uid}
                    className="btn btn-floating initials_button"
                >
                    {props.profile.initials}
                </NavLink>
            </li>
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
