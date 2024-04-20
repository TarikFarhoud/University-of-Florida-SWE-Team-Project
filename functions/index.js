/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

exports.addUserToFirestore = functions.auth.user().onCreate((user) => {
    const db = admin.firestore();
    let currentDate = new Date();

    return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        creationDate: currentDate,
        points: 0,
        items: 0,

    })
        .then(() => {
            console.log('User added to Firestore');
            return null;
        })
        .catch((error) => {
            console.error('Error adding user to Firestore', error);
        });
});

exports.submitPoints = functions.https.onRequest((req, res) => {
    console.log(req.headers);

    res.status(200).send('Test');
});