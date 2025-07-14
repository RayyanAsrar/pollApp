import {
    db,
    collection,
    onSnapshot
} from "./firebase.js";

// const pollsRef = collection(db, "polls");
// onSnapshot(pollsRef, (snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// });



const unsub =collection(db,"polls") 
let arrOfPolls=[]
onSnapshot(unsub,(snapshot)=>{
snapshot.forEach((doc) => {
    arrOfPolls.push({ docID:doc.id, docData:doc.data()})
    // console.log(doc.id, " => ", doc.data());
    
});
console.log(arrOfPolls);

<<<<<<< HEAD:js/getData.js
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
=======
})
>>>>>>> parent of b194054 (selected index and value of checkbox):getData.js
