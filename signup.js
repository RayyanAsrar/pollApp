import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
} from "./firebase.js";
import { signInWithGoogle } from "./login.js";
import { handleSignOut } from "./helper.js";
let userEmail = document.getElementById('email')
let userPassword = document.getElementById('password')
let registerBtn = document.getElementById('registerBtn')
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let signInWithGoogleBtn = document.getElementById('signInWithGoogleBtn')
const signOutBtn = document.getElementById("signOutBtn");


signOutBtn && signOutBtn.addEventListener("click", handleSignOut);
////////////////// ye validation AI se lagwai thi because it was simple and i didnt want to waste my time on this shi!!!
// Password visibility toggles
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eyeIcon.classList.toggle('hidden');
    eyeOffIcon.classList.toggle('hidden');
});

const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const eyeIcon2 = document.getElementById('eyeIcon2');
const eyeOffIcon2 = document.getElementById('eyeOffIcon2');

toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    eyeIcon2.classList.toggle('hidden');
    eyeOffIcon2.classList.toggle('hidden');
});

// Password strength indicator
const lengthCheck = document.getElementById('lengthCheck');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    if (password.length >= 8) {
        lengthCheck.classList.remove('text-gray-400');
        lengthCheck.classList.add('text-green-500');
        lengthCheck.innerHTML = `
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    8+ characters
                `;
    } else {
        lengthCheck.classList.remove('text-green-500');
        lengthCheck.classList.add('text-gray-400');
        lengthCheck.innerHTML = `
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    8+ characters
                `;
    }
});

// Form submission with validation
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }

    // Add your signup logic here
    // alert('Account creation functionality would be implemented here');
});
//////////////////////////////////////////
let saveUserToDb = async (user) => {
    await setDoc(doc(db, "user", user.uid), {
        name: `${firstName.value} ${lastName.value}`,
        email: userEmail.value,
        uid: user.uid
    });
};


let register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userEmail.value,
            userPassword.value
        );

        const user = userCredential.user;
        await saveUserToDb(user);

        // Optionally delay if needed
        // setTimeout(() => {
        location = "login.html";
        // }, 200);

    } catch (error) {
        console.error("Error signing up:", error.code, error.message);
    }
};
registerBtn && registerBtn.addEventListener("click", register)
signInWithGoogleBtn && signInWithGoogleBtn.addEventListener("click", signInWithGoogle)