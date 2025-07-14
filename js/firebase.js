import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp,
    collection,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCdX-5I2noWvSyZjGSsv1yFmYRPNW2EKRw",
    authDomain: "poll-app-7f14b.firebaseapp.com",
    projectId: "poll-app-7f14b",
    storageBucket: "poll-app-7f14b.firebasestorage.app",
    messagingSenderId: "1028491663960",
    appId: "1:1028491663960:web:ee7bfdc0cd4d22f377482d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    provider,
    signInWithPopup,
    db,
    doc,
    setDoc,
    serverTimestamp,
    signOut,
    onAuthStateChanged,
    collection,
    onSnapshot,
}