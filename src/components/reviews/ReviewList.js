import React from 'react';

import SingleReview from './SingleReview';

const ReviewList = ({ reviews }) => {
	//console.log(reviews);
	return (
		<div>
			{reviews &&
				reviews.map((review) => {
					return <SingleReview review={review} key={review.id} />;
				})}
		</div>
	);
};

export default ReviewList;
