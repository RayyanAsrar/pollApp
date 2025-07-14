import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
} from "./firebase.js";
import { handleSignOut } from "./helper.js";

let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let signInBtn = document.getElementById("signInBtn");
let signInWithGoogleBtn = document.getElementById("signInWithGoogleBtn");
const signOutBtn = document.getElementById("signOutBtn");

signOutBtn && signOutBtn.addEventListener("click", handleSignOut);
////////////////// ye validation AI se lagwai thi because it was simple and i didnt want to waste my time on this shi!!!
// Password visibility toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");
const eyeOffIcon = document.getElementById("eyeOffIcon");
togglePassword.addEventListener("click", () => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  eyeIcon.classList.toggle("hidden");
  eyeOffIcon.classList.toggle("hidden");
});

// Form submission
let loginFormTest=document.getElementById("loginForm")
loginFormTest && loginFormTest.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your login logic here
  // alert('Login functionality would be implemented here');
});

let login = () => {
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      location = "index.html";

      console.log("sign in hogya malik ");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

signInBtn && signInBtn.addEventListener("click", login);

//*******use local host to check google sign in  */
let signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      location = "index.html";
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
signInWithGoogleBtn &&
  signInWithGoogleBtn.addEventListener("click", signInWithGoogle);
export { signInWithGoogle };
