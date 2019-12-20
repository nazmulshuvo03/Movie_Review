const initState = {
	reviews: []
};

const reviewReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_REVIEW':
			console.log('review created', action.review);
			return state;

		case 'CREATE_REVIEW_ERROR':
			console.log('review creation error', action.err);
			return state;

		case 'DELETE_REVIEW':
			console.log('review deleted', action.reviewId);
			return state;

		case 'DELETE_REVIEW_ERROR':
			console.log('review delete error', action.err);
			return state;

		case 'UPDATE_REVIEW':
			console.log('review updated', action.review);
			return state;

		case 'UPDATE_REVIEW_ERROR':
			console.log('review update error', action.err);
			return state;

		default:
			return state;
	}
};

export default reviewReducer;
