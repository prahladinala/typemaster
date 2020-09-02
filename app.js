const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//List of words for game
const words = [
  "apples",
  "bananas",
  "pears",
  "torchlight",
  "motorcycle",
  "brightwork",
  "quickthorn",
  "silver",
  "airplane",
  "juices",
  "superficial",
  "coldwar",
  "independent",
  "admit",
  "loving",
  "north",
  "warlike",
  "tenses",
  "eight",
  "feeble",
  "highfalutin",
  "steer",
  "bad",
];

//Init Word
let randomWord;

//Init Score
let score = 0;

//Init time
let time = 10;

//Init difficulty or get from local storage
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Set difficulty to select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus on text on load
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
// console.log(getRandomWord());

//Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Update time function
function updateTime() {
  //   console.log(1);
  time--;
  timeEl.innerHTML = time + "s";

  //set timer not going into negatives
  if (time === 0) {
    clearInterval(timeInterval);
    //End Game
    gameOver();
  }
}

//Game Over, Show End Screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick='location.reload()'>Play Again</button>
    `;

  endgameEl.style.display = "flex";
}
addWordToDOM();

//Event Listeners

//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  //   console.log(insertedText);
  //Check to see the typed value is equal to given word
  if (insertedText === randomWord) {
    //Correct word
    addWordToDOM();
    //Update Score
    updateScore();
    //Clear
    e.target.value = "";

    // time += 5;
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//Settings button click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  //   console.log(difficulty);
  // Add difficulty to local storage
  localStorage.setItem("difficulty", difficulty);
});
