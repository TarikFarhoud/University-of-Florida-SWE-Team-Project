import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

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
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: inputUsername
      }).then(() => {
        console.log('Username successfully updated')
        resolve("Account created successfully!");
      }).catch((error) => {
        console.log('Error adding username:', error);
        resolve(error.code);
      });
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email') {
        resolve('Invalid email');
      } else {
        resolve(errorCode);
      }
      
    });
  })

}

async function loginUser(inputEmail, inputPassword) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user.displayName);
        resolve('User logged in: '.concat(userCredential.user.displayName));
      }).catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          resolve('Invalid email');
        } else {
          resolve(error.code);
        }
      });
  })
}

function logoutUser() {
    auth.signOut();
}

function getUserInfo() {
  if (auth.currentUser) {
    return auth.currentUser;
  } else {
    return {};
  }
}

function isLoggedIn() {
  console.log(auth.currentUser);
  if (auth.currentUser) {
    return true;
  } else {
    return false;
  }
}

export { registerUser, loginUser, isLoggedIn, logoutUser, getUserInfo };
