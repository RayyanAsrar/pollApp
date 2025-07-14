import {signOut,auth} from "./js/firebase.js";

const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert("You’ve been signed out.");
   window.location.href = "../html/login.html";
  } catch (err) {
    console.error("Error signing out:", err);
  }
};
export{ handleSignOut }