import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ReviewList from '../reviews/ReviewList';

class Dashboard extends Component {
	state = {};
	render() {
		//console.log(this.props);
		const { reviews, auth } = this.props;

		if (!auth.uid) {
			return <Redirect to="/signin" />;
		} else {
			return (
				<div className="container-overview">
					<div className="row">
						<div className="col s12 m6">
							<ReviewList reviews={reviews} />
						</div>
						<div className="col s12 m5 offset-m1">
							<Notifications />
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		reviews: state.firestore.ordered.reviews,
		auth: state.firebase.auth
	};
};

export default compose(connect(mapStateToProps), firestoreConnect([ { collection: 'reviews' } ]))(Dashboard);