export const createReview = (review) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('reviews')
			.add({ ...review })
			.then(() => {
				dispatch({
					type: 'CREATE_REVIEW',
					review
				});
			})
			.catch((err) => {
				dispatch({
					type: 'CREATE_REVIEW_ERROR',
					err
				});
			});
	};
};
