
let users = JSON.parse(localStorage.getItem("users")) || [];


const loginDiv = document.querySelector(".login-div");
const signupDiv = document.querySelector(".signup-div");
const adminDiv = document.querySelector(".admin-div");

const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const admin = document.querySelector(".admin");

loginDiv.addEventListener('click', function () {
    login.classList.add("active");
    signup.classList.remove("active");
    admin.classList.remove("active");
});

signupDiv.addEventListener('click', function () {
    login.classList.remove("active");
    signup.classList.add("active");
    admin.classList.remove("active");
});

adminDiv.addEventListener('click', function () {
    login.classList.remove("active");
    signup.classList.remove("active");
    admin.classList.add("active");
});

loginDiv.addEventListener('click', function () {
    if (login.style.display === "none") {
        login.style.display = "block";
        signup.style.display = "none";
        admin.style.display = "none";
    }
});

signupDiv.addEventListener('click', function () {
    if (signup.style.display === "none") {
        login.style.display = "none";
        signup.style.display = "block";
        admin.style.display = "none";
    }
});

adminDiv.addEventListener('click', function () {
    if (admin.style.display === "none") {
        login.style.display = "none";
        signup.style.display = "none";
        admin.style.display = "block";
    }
});


const saveUser = (user) => {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};


const signSubmit = document.getElementById("sign-submit");
signSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

   
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username && email && password) {
     
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return; 
        }

        const newUser = {
            username: username,
            email: email,
            password: password,
            payment: { Upi: "", Card: "" }, 
            games: { snakeAndLadder: "", hangman: "", guessTheNumber: "", memoryGame: "" }, // Empty game details initially
            membership: "", 
            address: "" 
        };

        saveUser(newUser);

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        alert("Signup successful!");
    } else {
        alert("Please fill in all fields.");
    }
});


const loginSubmit = document.getElementById("login-submit");
loginSubmit.addEventListener("click", function (e) {
    e.preventDefault();

    const username = document.querySelector(".login #username").value;
    const password = document.querySelector(".login #password").value;


    const foundUser = users.find(user => user.username === username && user.password === password);
    if (foundUser) {
        alert("Login successful!");
        localStorage.setItem('currentUser',foundUser.username);
         window.location.href = "index.html";
      
    } else {
        alert("Invalid username or password.");
    }
});


const adminSubmit = document.getElementById("admin-submit");
adminSubmit.addEventListener("click", function (e) {
    e.preventDefault();


    const adminPassword = document.querySelector(".admin #password").value;


    if (adminPassword === "asdf123") {
        alert("Admin login successful!");
          window.location.href = "Admin/Event.html";
    } else {
        alert("Invalid admin password.");
    }
});
