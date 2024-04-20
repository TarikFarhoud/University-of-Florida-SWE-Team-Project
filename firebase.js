import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

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
const db = getFirestore(app);

function registerUser(inputUsername, inputEmail, inputPassword) {
  return new Promise((resolve) => {
    createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then(() => {
        //const user = userCredential.user;
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
          resolve(error.code);
        }

      });
  })

}

async function loginUser(inputEmail, inputPassword) {
  return new Promise((resolve) => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user.displayName);
        resolve('User logged in: '.concat(userCredential.user.displayName));
      }).catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          resolve('Invalid email');
        } else {
          resolve(toString(error.code));
        }
      });
  })
}

function logoutUser() {
  auth.signOut();
}

async function getUserInfo() {
  const user = auth.currentUser;
  if (user) {
    console.log(user);
    console.log("Display Name:", user.displayName);
    let data = { username: user.displayName };

    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    data['joinDate'] = docData.creationDate.toDate();
    data['points'] = docData.points;
    data['items'] = docData.items;

    console.log("Data:", data);

    return data;
  } else {
    console.log("no");
    return {};
  }
}

function isLoggedIn() {
  if (auth.currentUser) {
    return true;
  } else {
    return false;
  }
}

async function submitPoints(amount) {
  auth.currentUser.getIdToken(true).then(async (idToken) => {
    const response = await fetch(`https://us-central1-ufl-recycle-app.cloudfunctions.net/submitPoints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'points': amount,
        'token': idToken
      }
    });

    if (response.ok) {
      return;
    } else {
      console.error('Unable to reach firebase server');
    }
  })

}
export { registerUser, loginUser, isLoggedIn, logoutUser, getUserInfo, submitPoints };
