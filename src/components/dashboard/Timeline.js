import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import SingleReview from '../reviews/SingleReview';

class Timeline extends Component {
	state = {};
	render() {
		//console.log(this.props);
		const { reviews, uid } = this.props;
		return (
			<div>
				<h3 className="timelineHeading grey-text text-darken-2">My Timeline</h3>
				<div className="container">
					{reviews &&
						reviews.map((review) => {
							if (review.authorId === uid) {
								return (
									<Link to={'/review/' + review.id} key={review.id}>
										<SingleReview review={review} />
									</Link>
								);
							}
						})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	//console.log(myReviews)
	return {
		reviews: state.firestore.ordered.reviews,
		uid: state.firebase.auth.uid
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([ { collection: 'reviews', orderBy: [ 'createdAt', 'desc' ] } ])
)(Timeline);
