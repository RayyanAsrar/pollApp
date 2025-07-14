import { onAuthStateChanged, auth } from "./firebase.js";

const navLoginBtn = document.getElementById("navLoginBtn");
const navSignupBtn = document.getElementById("navSignupBtn");
const signOutBtn = document.getElementById("signOutBtn");

onAuthStateChanged(auth, (user) => {

  if (user) {
    signOutBtn?.classList.remove("hidden");
    navLoginBtn?.classList.add("hidden");
    navSignupBtn?.classList.add("hidden");
  } else {
    signOutBtn?.classList.add("hidden");
    navLoginBtn?.classList.remove("hidden");
    navSignupBtn?.classList.remove("hidden");
  }
 const currentPage = window.location.pathname;

if (
  !currentPage.includes("viewPolls") &&  // if NOT on viewPoll page
  preloader
) {
  preloader.classList.add("hidden");
}

}); 