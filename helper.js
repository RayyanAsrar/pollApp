import {signOut,auth} from "./firebase.js";

const handleSignOut = async () => {
  try {
    await signOut(auth);
    alert("You’ve been signed out.");
    window.location.href = "login.html";
  } catch (err) {
    console.error("Error signing out:", err);
  }
};
export{ handleSignOut }