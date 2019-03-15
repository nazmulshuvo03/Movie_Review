import React from 'react';
import { Link } from 'react-router-dom';

import SingleReview from './SingleReview';

const ReviewList = ({ reviews }) => {
	//console.log(reviews);
	return (
		<div>
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
