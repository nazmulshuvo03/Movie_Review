import React from 'react';

import SingleReview from './SingleReview';

const ReviewList = ({ reviews }) => {
	return (
		<div>
			{reviews &&
				reviews.map((review) => {
					return (
						<div key={review.id}>
							<SingleReview />
						</div>
					);
				})}
		</div>
	);
};

export default ReviewList;
