import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  provider,
  signInWithPopup,
} from "./firebase.js";

let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let signInBtn = document.getElementById("signInBtn");
let signInWithGoogleBtn = document.getElementById("signInWithGoogleBtn");

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
let signInWithGoogle =()=>{
   signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    location="index.html"
  }).catch((error) => {

     const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}
signInWithGoogleBtn && signInWithGoogleBtn.addEventListener('click',signInWithGoogle)
export{ signInWithGoogle }