// Document Elements variables
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
console.log(progressBarFull)


// Variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


//  Data
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

const correctBonus = 10;
const maxQuestions = 3;

startGame = () => {
    questionCounter =0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
};


getNewQuestions = () => {
    if(availableQuestions.legnth === 0 || questionCounter >= maxQuestions){
       localStorage.setItem("mostRecentScore", score); 
        // Go to the end page
        return window.location.assign('/results.html')
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
    console.log((questionCounter / maxQuestions) * 100)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true
};


// Checks for the chosen answer and applies the necessary class name
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const calssToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(calssToApply === 'correct'){
            incrementScore(correctBonus);
        }

        selectedChoice.parentElement.classList.add(calssToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(calssToApply);
            getNewQuestions();  
        },2000)
        
        
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();