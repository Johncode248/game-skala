const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = [];
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the average daily usage of social media per person worldwide in 2023?",
        choice1: "1 hour",
        choice2: "2 hours",
        choice3: "2 hours and 24 minutes",
        choice4: "3 hours and 15 minutes",
        answer: 3
    },
    {
        question: "How many hours per day does the average teenager spend on social media?",
        choice1: "1-2 hours",
        choice2: "3-4 hours",
        choice3: "5-6 hours",
        choice4: "7-8 hours",
        answer: 2
    },
    {
        question: "What percentage of Facebook accounts were fake according to the 2021 report?",
        choice1: "1-2%",
        choice2: "5-6%",
        choice3: "8-9%",
        choice4: "10-11%",
        answer: 2
    },
    {
        question: "What percentage of the world's population uses social media?",
        choice1: "45%",
        choice2: "57%",
        choice3: "67%",
        choice4: "72%",
        answer: 3
    },
    {
        question: "Which social media platform has the most monthly active users worldwide?",
        choice1: "Facebook",
        choice2: "YouTube",
        choice3: "WhatsApp",
        choice4: "Instagram",
        answer: 1
    },
    {
        question: "What was the total number of active social media users worldwide in 2023?",
        choice1: "2.5 billion",
        choice2: "3 billion",
        choice3: "4.9 billion",
        choice4: "5.3 billion",
        answer: 3
    },
    {
        question: "How many hours per month does the average user spend on TikTok?",
        choice1: "12 hours",
        choice2: "20 hours",
        choice3: "26 hours",
        choice4: "32 hours",
        answer: 3
    },
    {
        question: "Which well-known social media platform was originally named Picaboo?",
        choice1: "Snapchat",
        choice2: "Instagram",
        choice3: "TikTok",
        choice4: "Pinterest",
        answer: 1
    },
    {
        question: "Which social media platform was created by Mark Zuckerberg?",
        choice1: "Instagram",
        choice2: "Twitter",
        choice3: "LinkedIn",
        choice4: "Facebook",
        answer: 4
    },
    {
        question: "Which platform is best known for live streaming video games?",
        choice1: "TikTok",
        choice2: "Twitch",
        choice3: "Facebook",
        choice4: "Twitter",
        answer: 2
    },
];


//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        // todo make here a window popup
        return window.location.assign("/end.html"); 
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

          if(classToApply == "correct"){
            incrementScore(CORRECT_BONUS)
          }
        
        selectedChoice.parentElement.classList.add(classToApply);  

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}



startGame();