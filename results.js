// DOM variables
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');

// Getting the score from the local storage
const mostRecentScore = localStorage.getItem("mostRecentScore");

finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});


saveScore = e => {
    e.preventDefault();

    const newScore = {
        score: mostRecentScore,
        name: username.value,
    };

    highScores.push(newScore);

    highScores.sort((a,b) => b.score - a.score); // Sorts the array by highst score

    highScores.splice(5); // Limit the array to only top 5 scores

    // Store the updated highScores array back into localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    window.location.assign('/');
}