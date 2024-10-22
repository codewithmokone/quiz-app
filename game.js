// Document Elements variables
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

// Variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let maxQuestions = 4;

const correctBonus = 10;

// Fetching data from json file
fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
)
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    maxQuestions = loadedQuestions.results.length;
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
      return formattedQuestion;
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestions = () => {
  if (availableQuestions.legnth === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);
    // Go to the end page
    return window.location.assign("/results.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${maxQuestions}`;
  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
  console.log((questionCounter / maxQuestions) * 100);
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

// Checks for the chosen answer and applies the necessary class name
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const calssToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (calssToApply === "correct") {
      incrementScore(correctBonus);
    }

    selectedChoice.parentElement.classList.add(calssToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(calssToApply);
      getNewQuestions();
    }, 2000);
  });
});

incrementScore = (num) => {
  score += num;
  // scoreText.innerText = score;
};

startGame();
