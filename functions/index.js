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
        uid: user.uid, // Unique ID for the user
        email: user.email, // Email of the user
        creationDate: currentDate, // Date user created their account
        points: 0, // Current points useable in the shop
        totalPoints: 0, // Total points earned
        items: 0, // Total items recycled
        awards: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Award array, stores the number of each award the user has purchased
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

            const fetchUserDetailsPromises = leaderboardSnap.docs.map(doc => {
                const userData = doc.data();
                return admin.auth().getUser(userData.uid)
                    .then(userRecord => {
                        return {
                            id: userData.uid,
                            username: userRecord.displayName,
                            totalPoints: userData.totalPoints
                        };
                    }).catch(error => {
                        console.error('Error fetching user details', error);
                        return null;
                    });
            });

            const resolvedLeaderboard = await Promise.all(fetchUserDetailsPromises);
            const leaderboard = resolvedLeaderboard.filter(user => user !== null);

            console.log("Leaderboard Size:", leaderboard.length);

            res.status(200).send({ leaderboard: leaderboard });
        } catch (error) {
            console.error('Error accessing Firestore or getting leaderboard', error);
            res.status(500).send('Error getting leaderboard');
        }
    });
});