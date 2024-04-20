/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
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
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send('Method Not Allowed');
        }

        const idToken = req.headers.token;
        let uid;
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            uid = decodedToken.uid;
        } catch (error) {
            return res.status(403).send('Failed to authenticate token');
        }
        const db = admin.firestore();
        const userRef = db.collection('users').doc(uid);
        try {
            const doc = await userRef.get();
            if (!doc.exists) {
                return res.status(404).send('User not found');
            }
            const userData = doc.data();
            const currentPoints = userData.points || 0;
            const currentItems = userData.items || 0;
            const additionalPoints = parseInt(req.headers.points, 10);

            if (isNaN(additionalPoints)) {
                return res.status(400).send('Invalid points value');
            }

            const newPoints = currentPoints + additionalPoints;
            const newItems = currentItems + 1;
            await userRef.update({ points: newPoints, items: newItems });

            res.status(200).send(`Points updated: ${newPoints}`);
        } catch (error) {
            console.error('Error accessing Firestore or updating points', error);
            res.status(500).send('Error updating points');
        }
    });
});