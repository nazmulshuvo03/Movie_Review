import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";

import DeletevEditReview from "../options/DeleteEditReview";

const ReviewDetails = (props) => {
    const { id, review, auth } = props;

    // console.log(props);

    if (!auth.uid) {
        return <Redirect to="/signin" />;
    } else {
        if (review) {
            return (
                <div
                    style={{
                        width: "70rem",
                        margin: "0 auto",
                        minHeight: "30rem",
                    }}
                >
                    <div
                        className="row"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "3rem",
                            fontWeight: "600",
                            textAlign: "center",
                            padding: "1rem",
                            width: "100%",
                        }}
                    >
                        <div
                            className="col s11"
                            style={{ paddingLeft: "1rem" }}
                        >
                            {review.name}
                        </div>
                        <div className="col s1" style={{ textAlign: "right" }}>
                            <button
                                onClick={props.handleClose}
                                style={{
                                    border: "none",
                                    backgroundColor: "#fff",
                                    margin: "0",
                                    padding: "0",
                                    color: "#737373",
                                }}
                            >
                                <i
                                    className="material-icons"
                                    style={{ fontSize: "2.5rem" }}
                                >
                                    clear
                                </i>
                            </button>
                        </div>
                    </div>
                    <div className="row" style={{ height: "30rem" }}>
                        <div className="col s4">
                            <img
                                src={
                                    review.posterUrl ||
                                    "https://via.placeholder.com/300x200"
                                }
                                alt="Poster"
                                height="300"
                                width="100%"
                            />
                        </div>
                        <div className="col s8">
                            <div>{review.content}</div>
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            marginBottom: "0",
                            padding: "1rem 0",
                            borderTop: "1px solid #eee",
                        }}
                    >
                        <div className="col s4">
                            <div style={{ marginTop: "5px" }}>
                                <span style={{ color: "#999" }}>
                                    Reviewed By{" "}
                                </span>
                                <span style={{ fontStyle: "italic" }}>
                                    {review.authorFirstName}{" "}
                                    {review.authorLastName}
                                </span>
                            </div>
                        </div>
                        <div className="col s4">
                            <div
                                style={{
                                    color: "#999",
                                    marginTop: "5px",
                                    textAlign: "center",
                                }}
                            >
                                {moment(review.createdAt.toDate()).calendar()}
                            </div>
                        </div>
                        <div className="col s4">
                            <DeletevEditReview
                                authorId={review.authorId}
                                reviewId={id}
                                review={review}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container center">
                    <p>Loading Review ....</p>
                </div>
            );
        }
    }
};

const mapStateToProps = (state, ownprops) => {
    // const id = ownprops.match.params.id;
    const id = ownprops.id;
    const reviews = state.firestore.data.reviews;
    const review = reviews ? reviews[id] : null;
    //console.log(state);
    return {
        id,
        review: review,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collection: "reviews",
        },
    ])
)(ReviewDetails);
