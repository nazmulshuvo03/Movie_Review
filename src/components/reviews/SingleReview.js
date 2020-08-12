import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import DeletevEditReview from "../options/DeleteEditReview";

const SingleReview = ({ review, reviewId }) => {
    //console.log(review.authorId);
    return (
        <div
            className="z-depth-2"
            style={{
                border: "5px solid #eee",
                height: "17rem",
                margin: "2rem",
            }}
        >
            <div className="row" style={{ width: "100%", height: "100%" }}>
                <div className="col s3">
                    <div
                        style={{
                            width: "100%",
                            height: "16.3rem",
                            borderRight: "5px solid #eee",
                        }}
                    >
                        <Link to={"/review/" + reviewId}>
                            <img
                                style={{ width: "100%", height: "100%" }}
                                src={
                                    review.posterUrl ||
                                    "https://via.placeholder.com/180x150"
                                }
                                alt="Poster"
                            />
                        </Link>
                    </div>
                </div>
                <div className="col s9">
                    <div style={{ padding: "0.5rem 0" }}>
                        <div
                            className="row"
                            style={{ margin: "0", height: "5rem" }}
                        >
                            <div
                                className="col s7"
                                style={{ padding: "0", overflow: "hidden" }}
                            >
                                <Link
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "1.75rem",
                                        fontWeight: "500",
                                        color: "#212121",
                                    }}
                                    to={"/review/" + reviewId}
                                >
                                    {review.name}
                                </Link>
                            </div>
                            <div className="col s5">
                                <p
                                    className="right"
                                    style={{
                                        margin: "5px",
                                        color: "#999",
                                    }}
                                >
                                    {moment(
                                        review.createdAt.toDate()
                                    ).calendar()}
                                </p>
                            </div>
                        </div>

                        <div style={{ height: "7rem" }}>
                            <p>
                                {review.content.substring(0, 200) + "... ..."}
                            </p>
                        </div>
                        <div
                            className="row"
                            style={{
                                margin: "0",
                                borderTop: "1px solid #ddd",
                                paddingTop: "0.5rem",
                            }}
                        >
                            <div className="col s6">
                                <span style={{ color: "#999" }}>
                                    Reviewed By{" "}
                                </span>
                                <span style={{ fontStyle: "italic" }}>
                                    {review.authorFirstName}{" "}
                                    {review.authorLastName}
                                </span>
                            </div>
                            <div className="col s6">
                                <DeletevEditReview
                                    authorId={review.authorId}
                                    reviewId={reviewId}
                                    review={review}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleReview;
