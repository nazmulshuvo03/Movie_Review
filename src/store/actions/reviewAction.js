export const createReview = (review) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		//console.log(getState());
		const authorId = getState().firebase.auth.uid;
		const profile = getState().firebase.profile;

		firestore
			.collection('reviews')
			.add({
				...review,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorId,
				createdAt: new Date()
			})
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

export const deleteReview = (reviewId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();

		firestore
			.collection('reviews')
			.doc(reviewId)
			.delete()
			.then(() => {
				dispatch({
					type: 'DELETE_REVIEW',
					reviewId
				});
			})
			.catch((err) => {
				dispatch({
					type: 'DELETE_REVIEW_ERROR',
					err
				});
			});
	};
};

export const updateReview = (review, reviewId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		//console.log(getState());
		const authorId = getState().firebase.auth.uid;
		const profile = getState().firebase.profile;

		firestore
			.collection('reviews')
			.doc(reviewId)
			.set({
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorId,
				createdAt: new Date()
			})
			.then(() => {
				dispatch({
					type: 'UPDATE_REVIEW',
					review
				});
			})
			.catch((err) => {
				dispatch({
					type: 'UPDATE_REVIEW_ERROR',
					err
				});
			});
	};
};
