import { auth , signInWithEmailAndPassword } from "./firebase.js";

let userEmail= document.getElementById('email')
let userPassword= document.getElementById('password')
let signInBtn= document.getElementById('signInBtn')

let login=()=>{
signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    location="index.html"
    
    console.log("sign in hogya malik ");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

signInBtn.addEventListener("click",login)