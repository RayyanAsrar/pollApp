let optionCount = 2;
const optionsContainer = document.getElementById("optionsContainer");
const addOptionBtn = document.getElementById("addOptionBtn");

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


let updateOptionNumbers=()=>{
  const allInputs = optionsContainer.querySelectorAll('input[name="option"]');
  allInputs.forEach((input, index) => {
    input.placeholder = `Option ${index+1}`;
  });
}

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
  } else {
    console.log("hello");
  }
  updateOptionNumbers();
});
// Polls ko firebase mai add krne ki koshish ki ja rhi hai malik 
