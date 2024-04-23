/* eslint-disable no-undef */
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

// Array to convert index of Award into the cost of that award
const costConvert = [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 500, 1000];

/****************************************************************************/
/*                          addUserToFirestore                              */
/*                                                                          */
/*         Called when a user is created. Initializes the values            */
/*         to default values of a new user in their database document.      */
/****************************************************************************/
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

/****************************************************************************/
/*                               submitPoints                               */
/*                                                                          */
/*         Called when a user submits a recycled item to the server.        */
/*         Adds the points to their spendable points as well as total       */
/*         accumulated points.                                              */
/****************************************************************************/
exports.submitPoints = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send('Method Not Allowed');
        }

        const idToken = req.headers.token;
        let uid;

        // Check if the token sent by the user is valid.
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            uid = decodedToken.uid;
        } catch (error) {
            return res.status(403).send('Failed to authenticate token');
        }

        const db = admin.firestore();
        const userRef = db.collection('users').doc(uid);

        // Get user data and try to submit the points.
        try {
            const doc = await userRef.get();
            if (!doc.exists) {
                return res.status(404).send('User not found');
            }
            // Grab user data for calculations.
            const userData = doc.data();
            const currentPoints = userData.points || 0;
            const currentTotal = userData.totalPoints || 0;
            const currentItems = userData.items || 0;
            const additionalPoints = parseInt(req.headers.points, 10);

            // Check if additionalPoints is valid.
            if (isNaN(additionalPoints)) {
                return res.status(400).send('Invalid points value');
            }

            // Calcualte new points and update the users database document.
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

/****************************************************************************/
/*                              purchaseAward                               */
/*                                                                          */
/*         Called when a user purchases an award in the shop. The cost      */
/*         of the award is checked against the users current spendable      */
/*         points. If the user has enough points, the award is added to     */
/*         their award array and the points are deducted from their         */
/*         spendable points.                                                */
/****************************************************************************/
exports.purchaseAward = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send('Method Not Allowed');
        }

        const idToken = req.headers.token;
        let uid;

        // Check if the token sent by the user is valid.
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            uid = decodedToken.uid;
        } catch (error) {
            return res.status(403).send('Failed to authenticate token');
        }

        const db = admin.firestore();
        const userRef = db.collection('users').doc(uid);

        // Get user data and try to purchase the award.
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

            // Check if award index is valid
            if (awardIndex <= 16) {
                newAwards[awardIndex]++;
                newPoints = currentPoints - costConvert.at(awardIndex);
            } else {
                return res.status(404).send('Invalid award index');
            }

            // Check if user has enough spendable points to purchase the award.
            if (newPoints < 0) {
                return res.status(400).send('Not enough points');
            }

            // After all checks pass, add the award to the users award array and deduct points.
            await userRef.update({ awards: newAwards, points: newPoints });

            res.status(200).send(`Points updated: ${newPoints}`);
        } catch (error) {
            console.error('Error accessing Firestore or updating points', error);
            res.status(500).send('Error updating points');
        }
    });
});

/****************************************************************************/
/*                              getLeaderboard                              */
/*                                                                          */
/*         Called when a user goes to the leaderboard page. The current     */
/*         leaderboard is calculated by sorting the total points            */
/*         accumulated for each user in decending order and returning       */
/*         those users.                                                     */
/****************************************************************************/
exports.getLeaderboard = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send('Method Not Allowed');
        }

        const db = admin.firestore();
        const users = db.collection('users');


        try {
            // Get the user list in descending order of total points.
            const leaderboardSnap = await users.orderBy('totalPoints', 'desc').get();

            // Create user objects for their id, username and total points to be returned by the function.
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

            // Call the function to create the user data objects and add to leaderboard object.
            const resolvedLeaderboard = await Promise.all(fetchUserDetailsPromises);
            const leaderboard = resolvedLeaderboard.filter(user => user !== null);

            res.status(200).send({ leaderboard: leaderboard });
        } catch (error) {
            console.error('Error accessing Firestore or getting leaderboard', error);
            res.status(500).send('Error getting leaderboard');
        }
    });
});