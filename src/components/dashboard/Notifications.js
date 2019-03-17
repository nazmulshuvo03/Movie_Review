import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
	//console.log(props);
	const { notifications } = props;
	return (
		<div className="section">
			<div className="card">
				<div className="card-content">
					<span className="card-title">Notifications</span>
					<ul className="notifications">
						{notifications &&
							notifications.map((item) => {
								return (
									<li key={item.id}>
										<span>{item.user}</span>
										<span> {item.content}</span>
										<span> {moment(item.time.toDate()).fromNow()}</span>
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
