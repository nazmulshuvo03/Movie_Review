import React from 'react';
import { Link } from 'react-router-dom';

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
					return (
						<Link to={'/review/' + review.id} key={review.id}>
							<SingleReview review={review} />
						</Link>
					);
				})}
		</div>
	);
};

export default ReviewList;
