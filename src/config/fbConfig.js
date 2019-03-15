import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
	apiKey: 'AIzaSyAZ6QKT_oKgObuXrOotVW-G0bW4XiKO2n8',
	authDomain: 'movie-review-abe50.firebaseapp.com',
	databaseURL: 'https://movie-review-abe50.firebaseio.com',
	projectId: 'movie-review-abe50',
	storageBucket: '',
	messagingSenderId: '531673762704'
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
