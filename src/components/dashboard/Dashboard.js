import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ReviewList from '../reviews/ReviewList';
import SearchBar from '../layout/SearchBar';

class Dashboard extends Component {
	state = {};
	render() {
		//console.log(this.props);
		const { reviews, auth, notifications } = this.props;

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		} else {
			return (
				<div className="dashboard grey lighten-3">
					<div className="row z-depth-0">
						<SearchBar />
						<div className="col s8">
							<ReviewList reviews={reviews} />
						</div>
						<div className="col s3 offset-s1 container">
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
		notifications: state.firestore.ordered.notifications
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'reviews', orderBy: [ 'createdAt', 'desc' ] },
		{ collection: 'notifications', orderBy: [ 'time', 'desc' ] }
	])
)(Dashboard);
