import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import DeletevEditReview from "../options/DeleteEditReview";

const TimelineReview = ({ review, reviewId }) => {
	//console.log(review.authorId);
	return (
		<div className="card horizontal z-depth-5 timeline_review">
			<div className="card-image">
				<Link to={"/review/" + reviewId}>
					<img
						className="timeline_review_image"
						src={
							review.posterUrl ||
							"https://via.placeholder.com/180x150"
						}
						alt="Poster"
					/>
				</Link>
			</div>
			<div className="card-stacked">
				<div className="row timeline_review_upper_lower_section">
					<div className="col s8 timeline_review_title">
						<Link
							className="card-title single_review_name"
							to={"/review/" + reviewId}
						>
							{review.name}
						</Link>
					</div>
					<div className="col s4">
						<p className="single_review_date right">
							{moment(review.createdAt.toDate()).calendar()}
						</p>
					</div>
				</div>

				<div className="card-content single_review_content">
					<p>{review.content}</p>
				</div>
				<div className="card-action row timeline_review_upper_lower_section">
					<div className="col s6">
						<span className="single_review_author_title">
							Reviewed By{" "}
						</span>
						<span className="single_review_author">
							{review.authorFirstName} {review.authorLastName}
						</span>
					</div>
					<div className="col s3 offset-s3">
						<DeletevEditReview
							authorId={review.authorId}
							reviewId={reviewId}
							review={review}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimelineReview;
