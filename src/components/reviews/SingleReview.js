import React from 'react';
import moment from 'moment';

const SignleReview = ({ review }) => {
	//console.log(review.createdAt.toDate());
	return (
		<div className="card">
			<div className="card-content">
				<div className="card-title">{review.name}</div>
				<div>
					<p>
						Reviewed By {review.authorFirstName} {review.authorLastName}
					</p>
					<p>{moment(review.createdAt.toDate()).calendar()}</p>
				</div>
			</div>
		</div>
	);
};

export default SignleReview;
