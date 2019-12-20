import React from 'react';

import SingleReview from './SingleReview';

const ReviewList = ({ reviews, searchTerm }) => {
	// console.log(searchTerm);
	var filteredList =
		reviews &&
		reviews.filter((review) => {
			return review.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
		});

	return (
		<div className="z-depth-0">
			{filteredList &&
				filteredList.map((review) => {
					return <SingleReview key={review.id} review={review} reviewId={review.id} />;
				})}
		</div>
	);
};

export default ReviewList;
