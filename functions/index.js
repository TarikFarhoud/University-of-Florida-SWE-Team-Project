/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

const costConvert = [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 500, 1000];

exports.addUserToFirestore = functions.auth.user().onCreate(async (user) => {
    const db = admin.firestore();
    let currentDate = new Date();

    return db.collection('users').doc(user.uid).set({
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        creationDate: currentDate,
        points: 0,
        totalPoints: 0,
        items: 0,
        awards: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
            const currentTotal = userData.totalPoints || 0;
            const currentItems = userData.items || 0;
            const additionalPoints = parseInt(req.headers.points, 10);

            if (isNaN(additionalPoints)) {
                return res.status(400).send('Invalid points value');
            }

            const newPoints = currentPoints + additionalPoints;
            const newItems = currentItems + 1;
            await userRef.update({ points: newPoints, totalPoints: currentTotal + additionalPoints, items: newItems });

            res.status(200).send(`Points updated: ${newPoints}`);
        } catch (error) {
            console.error('Error accessing Firestore or updating points', error);
            res.status(500).send('Error updating points');
        }
    });
});

exports.purchaseAward = functions.https.onRequest((req, res) => {
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
            const awardIndex = req.headers.award;
            const currentPoints = userData.points;
            let newAwards = userData.awards;
            let newPoints;

            console.log(awardIndex);

            if (awardIndex <= 16) {
                newAwards[awardIndex]++;
                newPoints = currentPoints - costConvert.at(awardIndex);
            } else {
                return res.status(404).send('Invalid award index');
            }

            if (newPoints < 0) {
                return res.status(400).send('Not enough points');
            }

            await userRef.update({ awards: newAwards, points: newPoints });

            res.status(200).send(`Points updated: ${newPoints}`);
        } catch (error) {
            console.error('Error accessing Firestore or updating points', error);
            res.status(500).send('Error updating points');
        }
    });
});

exports.getLeaderboard = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send('Method Not Allowed');
        }

        const db = admin.firestore();
        const users = db.collection('users');
        try {
            const leaderboardSnap = await users.orderBy('totalPoints', 'desc').get();
            const leaderboard = [];

            leaderboardSnap.forEach(doc => {
                const userData = doc.data();
                leaderboard.push({
                    id: doc.id,
                    username: userData.username,
                    totalPoints: userData.totalPoints
                });
            });

            console.log("Leaderboard Size:", leaderboard.length);

            res.status(200).send({ leaderboard });
        } catch (error) {
            console.error('Error accessing Firestore or getting leaderboard', error);
            res.status(500).send('Error getting leaderboard');
        }
    });
});