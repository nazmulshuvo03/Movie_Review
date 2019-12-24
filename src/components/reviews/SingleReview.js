import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import DeletevEditReview from '../options/DeleteEditReview';

const SignleReview = ({ review, reviewId }) => {
	//console.log(review.authorId);
	return (
		<div className="card black-text z-depth-5">
			<div className="card-content">
				<div className="row">
					<div className="col s3">
						<img
							src={review.posterUrl || 'https://via.placeholder.com/180x150'}
							alt="Poster"
							width="100%"
							height="100%"
						/>
					</div>
					<div className="col s9">
						<div className="row">
							<Link to={'/review/' + reviewId}>
								<div className="card-title col s9 red-text text-accent-4">{review.name}</div>
							</Link>
							<div className="col s3">
								<DeletevEditReview authorId={review.authorId} reviewId={reviewId} review={review} />
							</div>
						</div>
						<div className="row grey-text text-darken-4">
							<p>{review.content.substring(0, 100) + '... ...'}</p>
						</div>
						<div className="row">
							<p className="col s6">
								<span className="grey-text text-darken-2">Reviewed By </span>
								<span className="red-text text-accent-2">
									{review.authorFirstName} {review.authorLastName}
								</span>
							</p>
							<p className="col s4 offset-s2 grey-text text-darken-2">
								{moment(review.createdAt.toDate()).calendar()}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignleReview;
