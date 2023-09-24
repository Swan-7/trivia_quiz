async function fetchCategories() {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();

    console.log(data);
    const categorySelect = document.getElementById("category");

    data.trivia_categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error message:", error);
  }
}

fetchCategories();

const startButton = document.getElementById("startButton");
const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");
const questionsContainer = document.getElementById("questionsContainer");
const scoreContainer = document.getElementById("scoreContainer");

let currentQuestionIndex = 0;
let userScore = 0;
let triviaQuestions = [];

async function fetchTriviaQuestions() {
  try {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;

    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    triviaQuestions = data.results;
    console.log(triviaQuestions);

    startTrivia();
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
  }
}

function startTrivia() {
  currentQuestionIndex = 0;
  userScore = 0;
  scoreContainer.textContent = "";
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex < triviaQuestions.length) {
    const question = triviaQuestions[currentQuestionIndex];
    
    questionsContainer.innerHTML = `
      <p class="font-bold">Question ${currentQuestionIndex + 1}:</p>
      <p>${question.question}</p>
      <ul class="list-disc">
        ${question.incorrect_answers
          .map(
            (answer) =>
              `<li><button onclick="checkAnswer('${answer}')">${answer}</button></li>`
          )
          .join("")}
        <li><button onclick="checkAnswer('${question.correct_answer}')">${
      question.correct_answer
    }</button></li>
      </ul>
    `;
  } else {
    displayScore();
  }
}

function checkAnswer(selectedAnswer) {
  const question = triviaQuestions[currentQuestionIndex];
  if (selectedAnswer === question.correct_answer) {
    userScore++;
  }
  currentQuestionIndex++;
  displayQuestion();
}

function displayScore() {
  questionsContainer.innerHTML = "";
  scoreContainer.textContent = `Your Score: ${userScore} out of ${triviaQuestions.length}`;
  scoreContainer.classList.remove("hidden");
}


// Add event listeners
startButton.addEventListener("click", () => {
  fetchTriviaQuestions(); // Call the function to fetch questions
  console.log("button clicked");
});




