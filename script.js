const startBtn = document.getElementById("start-btn");
const gameContent = document.querySelector(".game-content");
const questionEl = document.getElementById("question");
const optionsEl = document.querySelector(".options");
const feedbackEl = document.getElementById("feedback");
const hudLevelEl = document.getElementById("hud-level");
const hudXpEl = document.getElementById("hud-xp");
const xpBarEl = document.getElementById("xp-bar");
const hudButtons = document.getElementById("hud-buttons");
const lvlNameEl = document.getElementById("lvl-name");

let currentLevel = 1;
let currentIndex = 0;
let levelXP = 0;
let totalXP = 0;

const levelTitles = {
  1: "The Syntax Sprite",
  2: "The Variable Vampire",
  3: "The Loop Leviathan",
  4: "The DOM Dragon",
  5: "The Closure Chimera"
};

const questions = [
  // Level 1 - Basics
  {
    level: 1,
    text: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "constant", "define"],
    answer: "constant",
    explanation: "'constant' ensures the variable cannot be changed once assigned.",
    xp: 20
  },
  {
    level: 1,
    text: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperloop Tag Mode Language",
      "Home Tool Markup Language"
    ],
    answer: "HyperText Markup Language",
    explanation: "HTML stands for HyperText Markup Language — it's the backbone of webpages.",
    xp: 20
  },
  {
    level: 1,
    text: "Which tag is used to insert a line break in HTML?",
    options: ["<lb>", "<break>", "<br>", "<line>"],
    answer: "<br>",
    explanation: "The <br> tag inserts a line break.",
    xp: 20
  },

  // Level 2 - JS Foundations
  {
    level: 2,
    text: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    answer: "//",
    explanation: "Double slashes (//) start single-line comments in JavaScript.",
    xp: 20
  },
  {
    level: 2,
    text: "Which method is used to output messages to the console?",
    options: ["print()", "log()", "console.log()", "display()"],
    answer: "console.log()",
    explanation: "`console.log()` is used to print messages to the browser console.",
    xp: 20
  },
  {
    level: 2,
    text: "What is the correct way to declare a function?",
    options: ["func myFunc()", "function = myFunc()", "function myFunc()", "define myFunc()"],
    answer: "function myFunc()",
    explanation: "`function myFunc()` is the correct way to declare a function.",
    xp: 20
  },

  // Level 3 - Logic & Loops
  {
    level: 3,
    text: "What will `typeof []` return in JavaScript?",
    options: ["object", "array", "list", "undefined"],
    answer: "object",
    explanation: "Arrays are a type of object in JavaScript — so `typeof []` is 'object'.",
    xp: 20
  },
  {
    level: 3,
    text: "Which loop runs at least once before checking the condition?",
    options: ["for", "while", "do...while", "repeat"],
    answer: "do...while",
    explanation: "`do...while` loop executes once before checking the condition.",
    xp: 20
  },
  {
    level: 3,
    text: "What will `3 + '3'` return in JavaScript?",
    options: ["6", "33", "undefined", "error"],
    answer: "33",
    explanation: "The number is coerced to string, so it returns '33'.",
    xp: 20
  },

  // Level 4 - DOM & Events
  {
    level: 4,
    text: "Which method is used to select an element by ID?",
    options: ["getElement(id)", "getById()", "querySelector()", "getElementById()"],
    answer: "getElementById()",
    explanation: "`document.getElementById()` selects an element by ID.",
    xp: 20
  },
  {
    level: 4,
    text: "Which event occurs when a user clicks on an HTML element?",
    options: ["onhover", "onchange", "onmouseclick", "onclick"],
    answer: "onclick",
    explanation: "`onclick` is triggered when an element is clicked.",
    xp: 20
  },
  {
    level: 4,
    text: "Which of these is used to prevent default form submission?",
    options: ["stop()", "preventDefault()", "cancelEvent()", "blockAction()"],
    answer: "preventDefault()",
    explanation: "`event.preventDefault()` stops default form submission behavior.",
    xp: 20
  },

  // Level 5 - Advanced
  {
    level: 5,
    text: "What is a closure in JavaScript?",
    options: [
      "A function with no name",
      "A function that returns itself",
      "A function with access to its outer scope",
      "A private variable"
    ],
    answer: "A function with access to its outer scope",
    explanation: "Closures allow a function to remember variables from its parent scope.",
    xp: 20
  },
  {
    level: 5,
    text: "Which array method returns the first element that matches a condition?",
    options: ["filter()", "find()", "map()", "forEach()"],
    answer: "find()",
    explanation: "`find()` returns the first matching element.",
    xp: 20
  },
  {
    level: 5,
    text: "Which of the following is used to make a fetch request?",
    options: ["ajax()", "fetch()", "getData()", "XMLHttp()"],
    answer: "fetch()",
    explanation: "`fetch()` is the modern way to make HTTP requests in JavaScript.",
    xp: 20
  }
];

function getLevelQuestions(level) {
  return questions.filter(q => q.level === level);
}

function loadQuestion(index) {
  const q = levelQuestions[index];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  hudButtons.innerHTML = "";
  lvlNameEl.textContent = levelTitles[currentLevel];

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt, q);
    optionsEl.appendChild(btn);
  });

  updateHUD();
}

function handleAnswer(selected, q) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === q.answer) {
    feedbackEl.innerHTML = `✅ Correct!<br><small>${q.explanation}</small>`;
    feedbackEl.style.color = "#4CAF50";
    levelXP += q.xp;
    totalXP += q.xp;

    updateHUD();

    if (currentIndex === levelQuestions.length - 1) {
      if (currentLevel >= 5) {
        hudButtons.innerHTML = `<button class="next-btn" onclick="endGame()">Finish</button>`;
      } else {
        hudButtons.innerHTML = `<button class="next-btn" onclick="nextLevel()">Next Level →</button>`;
      }
    } else {
      hudButtons.innerHTML = `<button class="next-btn" onclick="nextQuestion()">Next →</button>`;
    }
  } else {
    feedbackEl.innerHTML = `❌ Wrong! Try again.`;
    feedbackEl.style.color = "#FF5555";
    hudButtons.innerHTML = `<button class="next-btn" onclick="retryQuestion()">Retry</button>`;
  }
}

function nextQuestion() {
  currentIndex++;
  loadQuestion(currentIndex);
}

function retryQuestion() {
  loadQuestion(currentIndex);
}

function nextLevel() {
  currentLevel++;
  levelXP = 0;
  currentIndex = 0;
  levelQuestions = getLevelQuestions(currentLevel);
  loadQuestion(currentIndex);
}

function endGame() {
  questionEl.textContent = "🎉 You have completed all 5 levels of SpellCraft!";
  optionsEl.innerHTML = "";
  feedbackEl.innerHTML = `Total XP: ${totalXP}`;
  hudButtons.innerHTML = `<button class='next-btn' onclick='restartGame()'>Restart Game</button>`;
  xpBarEl.style.width = "100%";
}

function restartGame() {
  currentLevel = 1;
  currentIndex = 0;
  levelXP = 0;
  totalXP = 0;
  levelQuestions = getLevelQuestions(currentLevel);
  loadQuestion(currentIndex);
}

function updateHUD() {
  hudLevelEl.textContent = `Level: ${currentLevel}`;
  hudXpEl.textContent = `XP: ${totalXP} / 300`;
  const currentXpPercent = (levelXP / 60) * 100;
  xpBarEl.style.width = `${currentXpPercent}%`;
}

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  gameContent.style.display = "block";
  levelQuestions = getLevelQuestions(currentLevel);
  loadQuestion(currentIndex);
});
