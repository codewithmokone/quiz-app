const highScoresList = document.getElementById('highScoresList');

// Fetching data from local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log('High Scores:',highScores);


highScoresList.innerHTML = highScores.map(score => {
return `<li class="highScore">${score.name} - ${score.score}</li>`
}).join("");

