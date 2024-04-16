import { auth } from "firebase-functions";
import { initializeApp, firestore } from 'firebase-admin';
initializeApp();

export const addUserToFirestore = auth.user().onCreate((user) => {
    const db = firestore();
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