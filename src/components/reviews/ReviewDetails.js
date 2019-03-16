import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ReviewDetails = (props) => {
	const { review, auth } = props;

	if (!auth.uid) {
		return <Redirect to="/signin" />;
	} else {
		if (review) {
			return (
				<div className="card">
					<div className="card-content">
						<div className="card-title">{review.name}</div>
						<div>
							<p>{review.content}</p>
						</div>
						<div>
							<p>
								Reviewed By {review.authorFirstName} {review.authorLastName}
							</p>
							<p>{moment(review.createdAt.toDate()).calendar()}</p>
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
