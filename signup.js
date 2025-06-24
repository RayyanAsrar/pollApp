import { auth , createUserWithEmailAndPassword} from "./firebase.js";


let userEmail= document.getElementById('email')
let userPassword= document.getElementById('password')
let registerBtn= document.getElementById('registerBtn')
let register=()=>{
    // console.log(userEmail.value);
    // console.log(userPassword.value);
    ///********auth mai user mil jata hai malik */
createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
  .then((userCredential) => { 
    const user = userCredential.user;
    console.log(user);
    console.log(user.uid);
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
registerBtn.addEventListener("click",register)
