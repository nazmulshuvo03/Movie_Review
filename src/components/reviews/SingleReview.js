import React from 'react';

const SignleReview = ({ review }) => {
	//console.log(review);
	return (
		<div className="card">
			<div className="card-content">
				<div className="card-title">{review.name}</div>
				<div>
					<p>Reviewed By Some One</p>
					<p>6 December, 2018</p>
				</div>
			</div>
		</div>
	);
};

export default SignleReview;
