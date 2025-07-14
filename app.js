import { auth, db, doc, setDoc, serverTimestamp, } from "./firebase.js";
import { handleSignOut  } from "./helper.js";

let pollTitle = document.getElementById("pollTitle");
let optionCount = 2;
const optionsContainer = document.getElementById("optionsContainer");
const addOptionBtn = document.getElementById("addOptionBtn");
let createPollBtn = document.getElementById("createPollBtn");
let optionItemsInp = document.querySelectorAll('input[name="option"]');
const signOutBtn = document.getElementById("signOutBtn");


signOutBtn &&  signOutBtn.addEventListener("click", handleSignOut);

let addOptionFunc = () => {
  optionCount++;
  let optionDiv = document.createElement("div");
  optionDiv.className =
    "option-item flex items-center space-x-3 animate-fade-in-up";
  optionDiv.innerHTML = `<input 
  type="text"    
  name="option" 
  required 
  class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
  placeholder="Option ${optionCount}"
  >
  <button 
  type="button" 
  class="delete-option p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
  >
  ❌
  </button>
  `; 
  optionsContainer.appendChild(optionDiv);
};

addOptionBtn.addEventListener("click", addOptionFunc);

let updateOptionNumbers = () => {
  const allInputs = optionsContainer.querySelectorAll('input[name="option"]');
  allInputs.forEach((input, index) => {
    // console.log(index);
    input.placeholder = `Option ${index + 1}`;
    
  });
  console.log(allInputs);
  
};

optionsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-option")) {
    let optionDiv = e.target.closest(".option-item");
    const input = optionDiv.querySelector("input");
    let allOptions = optionsContainer.querySelectorAll(".option-item");
    let lastOptions = allOptions[allOptions.length - 1];
    if (input.value.trim() === "") {
      lastOptions.remove();
      optionCount--;
    } else {
      optionDiv.remove();
      optionCount--;
    }
  } 
  updateOptionNumbers();
});
// Polls ko firebase mai add krne ki koshish ki ja rhi hai malik*******************
const savePollToFirestore = async (poll) => {
  try {
    const pollRef = doc(db, "polls", poll.id);
    await setDoc(pollRef, { ...poll });
    alert("Poll successfully created!");
  } catch (err) {
    console.error("Error saving poll:", err);
    
  }
};

// neeche wale func mai validation AI ki madad se dali hain ( shukria )***************
let createPollFunc = async (e) => {
  e.preventDefault();

  let user = auth.currentUser;
  if (!user) {
    alert("User not authenticated. Please log in.");
    return;
  }

  const pollId = `${user.uid}_${Date.now()}`;
  const pollTitleValue = pollTitle.value.trim();

  if (pollTitleValue === "") {
    alert("Poll title cannot be empty.");
    return;
  }

  const currentInputs = document.querySelectorAll('input[name="option"]');
  let optionValues = [];

  currentInputs.forEach((input) => {
    let val = input.value.trim();
    if (val !== "") {
      optionValues.push(val);
    }
  });

  if (optionValues.length < 2) {
    alert("Please enter at least two valid options.");
    return;
  }


  class Polls {
    constructor(createdBy, id, title, options) {
      this.user = createdBy;
      this.id = id;
      this.title = title;
      this.options = options;
      this.votes = Array(options.length).fill(0);
      this.timeCreated = serverTimestamp();
      this.status = "active";
      this.type = "single";
      this.voters = [];
    }
  }

  let newPoll = new Polls(user.email, pollId, pollTitleValue, optionValues);
  console.log("Poll object:", newPoll);


  savePollToFirestore(newPoll);
};

createPollBtn.addEventListener("click", createPollFunc);