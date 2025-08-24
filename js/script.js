//////// AUTHENTICATION SECTION WORK /////////

let signUp = function(e) {
    e.preventDefault();

    let fullName = document.getElementById('fName').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let gender = document.getElementById('gender').value
    let dob = document.getElementById('dob').value

    let newUser = {
        fullname: fullName,
        email: email,
        password: password,
        gender: gender,
        dob: dob
    }

    if(localStorage.getItem("userList")) {
        let userList = JSON.parse(localStorage.getItem("userList"))
        userList.push(newUser)
        localStorage.setItem("userList", JSON.stringify(userList))
        alert("Signup successful! Please login.");
    } else {
        let userList = []
        userList.push(newUser)
        localStorage.setItem("userList", JSON.stringify(userList))
        alert("Signup successful! Please login.")
    }
    window.location.href = "login.html"
}

let login = function(e) {
    e.preventDefault();

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    if(localStorage.getItem("userList")) {
        let userList = JSON.parse(localStorage.getItem("userList"))

        let matchedUser = userList.find((user) => {
            if(user.email === email && user.password === password) {
                window.location.href = "instruction.html"
            } else {
                alert("Wrong email or password..Please try again")
            }
        })
    }

}

document.addEventListener('DOMContentLoaded', function () {
    let loginForm = document.getElementById('loginForm');
    let signUpForm = document.getElementById('signUpForm');

    if (signUpForm) {
        signUpForm.onsubmit = signUp;
    }

    if (loginForm) {
        loginForm.onsubmit = login;
    }
});


///////// QUIZ SECTION WORK ////////

const quiz = [
    { 
        question: "What is the capital of France?", 
        option: ["London", "Berlin", "Paris", "Madrid"], 
        answer: 2 
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        option: ["Venus", "Mars", "Jupiter", "Saturn"], 
        answer: 1 
    },
    { 
        question: "What is the largest mammal?", 
        option: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], 
        answer: 1 
    },
    { 
        question: "Which element has the chemical symbol 'O'?", 
        option: ["Gold", "Oxygen", "Osmium", "Oganesson"], 
        answer: 1 
    },
    { 
        question: "Who painted the Mona Lisa?", 
        option: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], 
        answer: 2 
    },
    { 
        question: "What is the largest ocean on Earth?", 
        option: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], 
        answer: 3 
    },
    { 
        question: "Which is not a primary color of light?", 
        option: ["Red", "Green", "Yellow", "Blue"], 
        answer: 2 
    },
    { 
        question: "What is the hardest natural substance on Earth?", 
        option: ["Gold", "Iron", "Diamond", "Platinum"], 
        answer: 2 
    },
    { 
        question: "How many bones are in the human body?", 
        option: ["206", "200", "300", "250"], 
        answer: 0 
    },
    { 
        question: "Which planet has the most moons?", 
        option: ["Jupiter", "Saturn", "Uranus", "Neptune"], 
        answer: 1 
    }
];

// Quiz variables
let index = 0, attempt = 0, score = 0, wrong = 0;
let timer;
const totalQuestions = quiz.length;


const questionScreen = document.getElementById('questionScreen');
const resultScreen = document.getElementById('resultScreen');
const questionBox = document.querySelector('.questionBox');
const options = document.querySelectorAll('.optionBox span');
const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');
const restartButton = document.getElementById('restartBtn');
const countBox = document.querySelector('.count span');
const scoreBox = document.querySelector('.scoreBox span');
const timerBox = document.querySelector('.timerBox span');
const totalQuestionElem = document.getElementById('totalQuestion');
const attemptQuestionElem = document.getElementById('attemptQuestion');
const correctQuestionElem = document.getElementById('correctQuestion');
const wrongAnswersElem = document.getElementById('wrongAnswers');
const scoreBoardElem = document.querySelector('.scoreBoard span');

function init() {
    index = 0; attempt = 0; score = 0; wrong = 0;
    totalQuestionElem.textContent = totalQuestions;
    

    // Timer
    let totalTime = 200;
    clearInterval(timer);

    timer = setInterval(function () {

        totalTime--;

        let min = Math.floor(totalTime / 60);
        let sec = totalTime % 60;

        // Format seconds (e.g., 5 → "05")
        if (sec < 10) {
            sec = "0" + sec;
        }
            

        timerBox.textContent = min + ":" + sec;

        if (totalTime <= 0) {
            clearInterval(timer);
            alert("Time is up. Press OK to show result");
            result();
        }
    }, 1000);


    printQuestions(index);

    for (let i = 0; i < options.length; i++) {
        options[i].onclick = function () {
            checkAnswer(options[i]);
        };
    }

    nextButton.onclick = showNext;
    prevButton.onclick = showPrev;
    restartButton.onclick = restartQuiz;

    scoreBox.textContent = "0";
    countBox.textContent = "1";
    questionScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
}

function printQuestions(i) {
    questionBox.textContent = quiz[i].question;
    for (let j = 0; j < options.length; j++) {
        options[j].textContent = quiz[i].option[j];
        options[j].className = ""; // reset class
        options[j].style.pointerEvents = "auto";
    }
    if (i === totalQuestions - 1) {
        nextButton.textContent = "Finish";
    } else {
        nextButton.textContent = "Next →";
    }
}

function checkAnswer(option) {
    attempt++;
    let optionClicked = parseInt(option.getAttribute('data-opt'));
    if (optionClicked === quiz[index].answer) {
        option.classList.add('correct');
        score++;
    } else {
        option.classList.add('wrong');
        wrong++;
    }
    scoreBox.textContent = attempt;
    for (let k = 0; k < options.length; k++) {
        options[k].style.pointerEvents = "none";
    }
    setTimeout(showNext, 800);
}

function showNext() {
    if (index < totalQuestions - 1) {
        index++;
        printQuestions(index);
        countBox.textContent = (index + 1).toString();
    } else {
        result();
    }
}

// ✅ Previous button function
function showPrev() {
    if (index > 0) {
        index--;
        printQuestions(index);
        countBox.textContent = (index + 1).toString();
    }
}

function result() {
    clearInterval(timer);
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreBoardElem.textContent = (score * 10).toString()+"/"+(totalQuestions * 10).toString();
    attemptQuestionElem.textContent = attempt.toString();
    correctQuestionElem.textContent = score.toString();
    wrongAnswersElem.textContent = wrong.toString();
}

function restartQuiz(e) {
    e.preventDefault();
    init();
}

window.onload = init;