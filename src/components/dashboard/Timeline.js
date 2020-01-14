import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import TimelineReview from "../reviews/TimelineReview";

class Timeline extends Component {
	state = {};
	render() {
		const { reviews, uid } = this.props;
		return (
			<div>
				<div className="container">
					<h3 className="center headline">My Timeline</h3>
					{reviews &&
						reviews.map(review => {
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
		);
	}
}

const mapStateToProps = state => {
	//console.log(state);
	return {
		reviews: state.firestore.ordered.reviews,
		uid: state.firebase.auth.uid
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: "reviews", orderBy: ["createdAt", "desc"] }
	])
)(Timeline);
