
// const pollsRef = collection(db, "polls");
// onSnapshot(pollsRef, (snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// });
import {
  db,
  collection,
  onSnapshot,
  doc
} from "./firebase.js";

let mainPoleContainingDiv = document.getElementById('mainPoleContainingDiv')

const unsub = collection(db, "polls")
let arrOfPolls = []
onSnapshot(unsub, (snapshot) => {
  arrOfPolls = [];
  snapshot.forEach((doc) => {
    arrOfPolls.push({ docID: doc.id, docData: doc.data() })
    // console.log(doc.id, " => ", doc.data());

  });
  // console.log(arrOfPolls);

  arrOfPolls.forEach((pollsData) => {
    // console.log(pollsData.docData);
    let { user, title, options, votes, id, type, status, timeCreated } = pollsData.docData


    mainPoleContainingDiv.innerHTML += `
  <div class="poll-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        ${title}
      </h2>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          ${user}
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ${timeCreated}
        </span>
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
            </path>
          </svg>
          ${votes.length} votes
        </span>
      </div>
    </div>  

    
      <div class="space-y-3 mb-6">
        ${options.map((option, index) => {
      let percent = Math.floor((votes.filter(v => v === index).length / votes.length) * 100);
      return `
            <label class="poll-option flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200">
              <input type="radio" name="poll${id}" value="${option}" class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300">
              <span class="ml-3 text-gray-900 dark:text-white font-medium">${option}</span>
              <div class="ml-auto flex items-center">
                <div class="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                  <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style="width: ${percent}%;"></div>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">${percent}%</span>
              </div>
            </label>
          `;
    }).join('')}
      </div>

    <button class="vote-btn w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
      Vote Now
    </button>
  </div>
  `;

    requestAnimationFrame(() => {
      preloader?.classList.add("hidden");
    });
  });


})
let handleVoteClick = (e) => {
  if (!e.target.classList.contains("vote-btn")) return
  const card = e.target.closest(".poll-card");
  const selectedOption = document.querySelector('input[type=radio]:checked')
  // console.log(selectedOption.value);

  if (!selectedOption) {
    console.log("Please select an option first.");
    return;
  }
  const selectedValue = selectedOption.value;
   const options=[...card.querySelectorAll('input[type="radio"]')].map((opt)=>{ return opt.value})
   const selectedIndex=options.indexOf(selectedValue)
   console.log(options);
   console.log(selectedIndex);
   



}
document.getElementById("mainPoleContainingDiv").addEventListener("click", handleVoteClick);
