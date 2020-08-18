import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TimelineReview from "../reviews/TimelineReview";
import SingleReview from "../reviews/SingleReview";
import Profile from "../dashboard/Profile";

class Timeline extends Component {
    state = {};
    render() {
        const { reviews, uid } = this.props;
        // console.log(this.props);
        return (
            <div style={{ width: "80rem" }}>
                {/* <div
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "3rem",
                        fontWeight: "600",
                        textAlign: "center",
                        padding: "1rem",
                        width: "100%",
                    }}
                >
                    My Profile
                </div> */}
                <div className="row">
                    <div
                        className="col s6"
                        // style={{ border: "1px solid #eee" }}
                    >
                        <Profile profile={this.props.profile} />
                    </div>
                    <div
                        className="col s6"
                        // style={{ border: "1px solid #eee" }}
                    >
                        <div
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2.5rem",
                                fontWeight: "600",
                                textAlign: "center",
                                margin: "2rem 0",
                                color: "#3c2d73",
                            }}
                        >
                            My Reviews
                        </div>
                        <div>
                            {reviews &&
                                reviews.map((review) => {
                                    if (review.authorId === uid) {
                                        return (
                                            <TimelineReview
                                                key={review.id}
                                                review={review}
                                                reviewId={review.id}
                                            />
                                        );
                                    } else return null;
                                })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("state", state);
    return {
        uid: state.firebase.auth.uid,
        reviews: state.firestore.ordered.reviews,
        profile: state.firebase.profile,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: "reviews", orderBy: ["createdAt", "desc"] },
        { collection: "users", orderBy: ["createdAt", "desc"] },
    ])
)(Timeline);
