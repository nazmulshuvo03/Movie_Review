import React from 'react';
import { Link } from 'react-router-dom';

import SingleReview from './SingleReview';

const ReviewList = ({ reviews }) => {
	//console.log(reviews);
	return (
		<div className="z-depth-0">
			{reviews &&
				reviews.map((review) => {
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
