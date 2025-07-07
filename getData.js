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

})