import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import DeletevEditReview from '../options/DeleteEditReview';

const ReviewDetails = (props) => {
	const { id, review, auth } = props;

	//console.log(props);

	if (!auth.uid) {
		return <Redirect to="/signin" />;
	} else {
		if (review) {
			return (
				<div className="container">
					<div className="card z-depth-3">
						<div className="card-content">
							<div className="row">
								<div className="card-title col s8 red-text text-accent-4">{review.name}</div>
								<p className="col s4 grey-text text-darken-2">
									{moment(review.createdAt.toDate()).calendar()}
								</p>
							</div>
							<div className="row">
								<div className="col s4">
									<img
										className="detail_review_image"
										src={review.posterUrl || 'https://via.placeholder.com/300x200'}
										alt="Poster"
									/>
								</div>
								<div className="col s8 grey-text text-darken-4">
									<p>{review.content}</p>
								</div>
							</div>
							<div className="row">
								<p className="col s9">
									<span className="grey-text text-darken-2">Reviewed By </span>
									<span className="red-text text-accent-2">
										{review.authorFirstName} {review.authorLastName}
									</span>
								</p>
								<div className="col s3">
									<DeletevEditReview authorId={review.authorId} reviewId={id} review={review} />
								</div>
							</div>
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
	const id = ownprops.match.params.id;
	const reviews = state.firestore.data.reviews;
	const review = reviews ? reviews[id] : null;
	//console.log(state);
	return {
		id,
		review: review,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: 'reviews'
		}
	])
)(ReviewDetails);
