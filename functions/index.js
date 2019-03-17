const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const createNotification = (notification) => {
	return admin
		.firestore()
		.collection('notifications')
		.add(notification)
		.then((doc) => console.log('Notificaiton added', doc));
};

exports.reviewCreated = functions.firestore.document('reviews/{reviewId}').onCreate((doc) => {
	const review = doc.data();
	const notification = {
		content: 'Added a new project',
		user: `${review.authorFirstName} ${review.authorLastName}`,
		time: admin.firestore.FieldValue.serverTimestamp()
	};

	return createNotification(notification);
});

exports.userJoined = functions.auth.user().onCreate((user) => {
	return admin.firestore().collection('users').doc(user.uid).get().then((doc) => {
		const newUser = doc.data();
		const notification = {
			content: 'Joined with us',
			user: `${newUser.firstName} ${newUser.lastName}`,
			time: admin.firestore.FieldValue.serverTimestamp()
		};

		return createNotification(notification);
	});
});
