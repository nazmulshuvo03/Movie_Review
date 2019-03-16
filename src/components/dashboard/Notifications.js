import React, { Component } from 'react';

class Notifications extends Component {
	state = {};
	render() {
		return (
			<div className="section">
				<div className="card">
					<div className="card-content">
						<span className="card-title">Notifications</span>
						<ul className="notifications">
							<li>Notification</li>
							<li>Notification</li>
							<li>Notification</li>
							<li>Notification</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Notifications;
