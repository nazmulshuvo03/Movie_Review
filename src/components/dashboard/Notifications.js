import React from "react";
import moment from "moment";

const Notifications = props => {
	//console.log(props);
	const { notifications } = props;
	return (
		<div className="card notifications">
			<div className="card-content">
				<span className="card-title center">Notifications</span>
				<ul className="">
					{notifications &&
						notifications.map(item => {
							return (
								<div
									className="collection z-depth-3"
									key={item.id}
								>
									<li className="collection-item single_notification">
										<span className="">{item.user}</span>
										<span> {item.content}</span>
										<span className="">
											{" " +
												moment(
													item.time.toDate()
												).fromNow()}
										</span>
									</li>
								</div>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default Notifications;
