import {
    auth, 
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
} from "./firebase.js";
import { signInWithGoogle } from "./login.js";
import { handleSignOut  } from "./helper.js";
let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')
let registerBtn = document.getElementById('registerBtn')
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let signInWithGoogleBtn = document.getElementById('signInWithGoogleBtn')
const signOutBtn = document.getElementById("signOutBtn");


signOutBtn &&  signOutBtn.addEventListener("click", handleSignOut);

let saveUserToDb = async (user) => {
    await setDoc(doc(db, "user", user.uid), {
        name: `${firstName.value} ${lastName.value}`,
        email: userEmail.value,
        uid: user.uid
    });
};


let register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userEmail.value,
            userPassword.value
        );

        const user = userCredential.user;
        await saveUserToDb(user);

        // Optionally delay if needed
        // setTimeout(() => {
            location = "login.html";
        // }, 200);

    } catch (error) {
        console.error("Error signing up:", error.code, error.message);
    }
};
registerBtn && registerBtn.addEventListener("click", register)
signInWithGoogleBtn && signInWithGoogleBtn.addEventListener("click", signInWithGoogle)
