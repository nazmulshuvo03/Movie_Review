import React, { Component } from 'react';

import Notifications from './Notifications';
import ReviewList from '../reviews/ReviewList';

class Dashboard extends Component {
	state = {};
	render() {
		return (
			<div className="container-overview">
				<div className="row">
					<div className="col s12 m6">
						<ReviewList />
					</div>
					<div className="col s12 m5 offset-m1">
						<Notifications />
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
