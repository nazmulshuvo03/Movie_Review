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

		default:
			return state;
	}
};

export default reviewReducer;
