// Firebase config (replace with your own from Firebase Console)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhuWW45SFg70CZT6HpXaGNIDEvqhicVxo",
  authDomain: "economics-e-learning.firebaseapp.com",
  projectId: "economics-e-learning",
  storageBucket: "economics-e-learning.firebasestorage.app",
  messagingSenderId: "331001032236",
  appId: "1:331001032236:web:d4fed5605a94a9ae312b89",
  measurementId: "G-YFZDB1VWQN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Signed Up"))
    .catch(err => alert(err.message));
}

export function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Logged In"))
    .catch(err => alert(err.message));
}

export function logout() {
  fbSignOut(auth);
  alert("Logged Out");
}
