//your JS code here.

// Do not change code below this line
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = q.question;
    questionDiv.appendChild(questionTitle);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      label.style.display = "block";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore progress
      if (progress[i] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // <-- ✅ Important for Cypress
      }

      input.addEventListener("change", (e) => {
        progress[i] = e.target.value;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

submitButton.addEventListener("click", () => {
  let score = 0;
  questions.forEach((q, i) => {
    if (progress[i] === q.answer) score++;
  });
  const msg = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = msg;
  localStorage.setItem("score", score.toString());
});

const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
  scoreElement.textContent = `Your score is ${lastScore} out of ${questions.length}.`;
}

renderQuestions();
