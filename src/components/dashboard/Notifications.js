import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
	//console.log(props);
	const { notifications } = props;
	return (
		<div className="section">
			<div className="card">
				<div className="card-content">
					<span className="card-title center">Notifications</span>
					<ul className="">
						{notifications &&
							notifications.map((item) => {
								return (
									<div className="collection z-depth-2">
										<li className="collection-item z-depth-3" key={item.id}>
											<span className="red-text text-accent-2">{item.user}</span>
											<span> {item.content}</span>
											<span className="grey-text text-darken-2">
												{' ' + moment(item.time.toDate()).fromNow()}
											</span>
										</li>
									</div>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Notifications;
