import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQrtfgyodGtwzJ47Af8rit8VIi_SEkEK0",
  authDomain: "ufl-recycle-app.firebaseapp.com",
  projectId: "ufl-recycle-app",
  storageBucket: "ufl-recycle-app.appspot.com",
  messagingSenderId: "68192476406",
  appId: "1:68192476406:web:36ef4f9f28ef6591d260d7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();


function registerUser(inputUsername, inputEmail, inputPassword) {
  createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: inputUsername
      }).then(() => {
        console.log('Username successfully updated')
      }).catch((error) => {
        console.log('Error adding username:', error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error:', errorCode, ',', errorMessage);
    });
}

export { registerUser };
