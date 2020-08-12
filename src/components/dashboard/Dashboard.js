import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import Notifications from "./Notifications";
import ReviewList from "../reviews/ReviewList";

class Dashboard extends Component {
    state = {
        searchTerm: "",
    };

    onChange = (e) => {
        this.setState({
            searchTerm: e.target.value,
        });
    };

    render() {
        //console.log(this.props);
        const { reviews, auth, notifications } = this.props;
        const { searchTerm } = this.state;

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        } else {
            return (
                <div className="dashboard">
                    <div className="row z-depth-0">
                        <div className="col s8">
                            <ReviewList
                                reviews={reviews}
                                searchTerm={searchTerm}
                            />
                        </div>
                        <div className="col s3 offset-s1">
                            <form style={{ padding: "1rem 0" }}>
                                <div
                                    className="input-field inline"
                                    style={{ width: "100%" }}
                                >
                                    <input
                                        type="text"
                                        id="search"
                                        style={{ width: "100%" }}
                                        onChange={this.onChange}
                                    />
                                    <label htmlFor="search" className="">
                                        Search Reviews Here...
                                        <i className="material-icons right">
                                            search
                                        </i>
                                    </label>
                                </div>
                            </form>
                            <Notifications notifications={notifications} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    //console.log(state.firestore.ordered.reviews);
    return {
        reviews: state.firestore.ordered.reviews,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "reviews", orderBy: ["createdAt", "desc"] },
        { collection: "notifications", orderBy: ["time", "desc"] },
    ])
)(Dashboard);
