import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import reviewReducer from './reviewReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	review: reviewReducer,
	firestore: firestoreReducer
});

export default rootReducer;
