/**
 *
 * Who Wants To Be A Millionaire
 * February 13, 2019
 * Dmitriy Shin
 *
 */

// Variables
////////////
const [firstName, lastName] = getPlayerName(); // Full player's name
const totalRounds = 3; // A total number of rounds
const questionsAsked = []; // A storage for all asked questions
let cashWon = 0; // A storage for total cash won during the game
let isLeaving = false; // A flag for whether tha player wants to leave or not
let hasLost = false;

// A storage for all non-asked questions
let questions = [
  makeQuestion(
    "What is a cancer?",
    [
      "Disease of the brain",
      "Disease of the heart",
      "Disease of the lungs",
      "Disease of the cells"
    ],
    "Disease of the cells"
  ),

  makeQuestion(
    "What vehiccle is Bumblebee?",
    ["Police Car", "Camaro", "Semi-Truck", "Helicopter"],
    "Camaro"
  ),

  makeQuestion(
    "Who is the leader of the Decepticons?",
    ["Megatron", "Starscream", "Scworponok", "Bonecrusher"],
    "Megatron"
  ),

  makeQuestion(
    "Which Canadian City Is Considered “Hollywood North”?",
    ["Toronto", "Vancouver", "Ottawa", "Quebec"],
    "Vancouver"
  ),

  makeQuestion(
    "How Many Points Does The Maple Leaf On The Flag Have?",
    [9, 2, 11, 5],
    11
  ),

  makeQuestion(
    "What is the national sport in Japan?",
    ["Basketball", "Soccer", "Sumo Wrestling", "Karate"],
    "Sumo Wrestling"
  ),

  makeQuestion(
    "How long is an Olympic swimming pool?",
    ["50m", "120m", "42m", "23m"],
    "50m"
  ),

  makeQuestion(
    "Which popular fitness method was invented by a German?",
    ["Boxing", "CrossFit", "Pilates", "HIIT"],
    "Pilates"
  ),

  makeQuestion(
    "How many tails does a Manx cat have?",
    ["One", "Three", "None", "Five"],
    "None"
  ),

  makeQuestion(
    "Which reptile, according to the song, should you never smile at?",
    ["Elephant", "Crocodile", "Hippo", "Lion"],
    "Crocodile"
  ),

  makeQuestion(
    "Who sang about being an eggman and a walrus?",
    ["The Black Eyed Peas", "Beyonce", "Michael Jackson", "The Beatles"],
    "The Beatles"
  ),

  makeQuestion(
    "Which of these is a type of apple?",
    ["Happy Delicious", "Happy Tasty", "Golden Tasty", "Golden Delicious"],
    "Golden Delicious"
  ),

  makeQuestion(
    "Which of these is not variety of Tomato?",
    ["Early Girl", "Herald", "Albert", "Eurocross"],
    "Albert"
  )
];

// Functions / Helpers
// Get a random question from a questions array
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

let randomQuestion = "";
let playerAnswer = "";
let correctAnswer = "";
let currentRound = 1;
let currentQuestion = 0;

// Main module
function runGame() {
  while (!hasLost) {
    randomQuestion = getRandomQuestion(); // A random question
    correctAnswer = randomQuestion.correct; // A correct answer to a random question
    displayQuestion(currentRound, randomQuestion, currentQuestion);
    removeQuestion(randomQuestion);

    if (playerAnswer === correctAnswer && currentRound !== totalRounds) {
      window.alert("Correct!");
      currentQuestion++;
      addCash(currentQuestion);
    } else gameOver();

    if (currentQuestion === 3 && currentRound !== totalRounds) {
      isLeaving = window.prompt("Would You Like To Leave? <Y/N>");

      if (isLeaving === "Y" || isLeaving === "y") {
        isLeaving = true;
        currentRound = 0;
        window.alert(
          `
          You Won: $${cashWon}!
          Thank You For Playing The Game!
        `
        );
        break;
      } else if (currentRound === totalRounds) {
        window.alert(`Congratulations! You Won $1000000.00!`);
        currentRound = 0;
        isLeaving = true;
        break;
      } else {
        currentRound++;
        currentQuestion = 0;
      }
    }
  }
}

function gameOver() {
  window.alert(`You Lost!`);
  hasLost = true;
  isLeaving = true;
}

// Displays the introductory text
function displayIntro() {
  window.alert(`Welcome To The Game ${firstName} ${lastName}`);
  window.alert(`You Will Be Asked A Series Of Questions`);
  window.alert(
    `Each Question Has Its Own Value [Q1 = $100.00, Q2 = $500.00, Q3 = $10000.00, etc.]`
  );
  window.alert(
    "There Are 3 Rounds In Total, If There Is One Wrong Answer, The Game Will Be Over And The Amount Received Will Be Discarded"
  );
  window.alert("Let's Get Started");
}

// Gets the player's name
function getPlayerName() {
  let firstName = window.prompt("Please Enter Your First Name");
  let lastName = window.prompt("Please Enter Your Last Name");

  while (firstName === null || firstName === "") {
    window.alert("First Name Can Not Be Empty");
    firstName = window.prompt("Please Enter Your First Name");
  }

  while (lastName === null || lastName === "") {
    window.alert("Last Name Can Not Be Empty");
    lastName = window.prompt("Please Enter Your Last Name");
  }

  return [firstName, lastName];
}

// Displays the question to the screen
let incorrectInput = false;
function displayQuestion(round, randomQuestion, currentQuestion) {
  playerAnswer = window.prompt(
    `
    Round ${round}
    Cash: ${cashWon}

    Question: ${currentQuestion + 1}

    ${randomQuestion.question} 
    
    [Type A, B, C or D]
    ${
      currentRound > 1
        ? totalCalls > 1
          ? `[To Make a Friend Call Type Call] - Total Calls ${totalCalls}`
          : ""
        : ""
    }

    A. ${randomQuestion.answers[0]}
    B. ${randomQuestion.answers[1]}
    C. ${randomQuestion.answers[2]}
    D. ${randomQuestion.answers[3]}
    `
  );

  if (playerAnswer === "A" || playerAnswer === "a")
    playerAnswer = randomQuestion.answers[0];
  else if (playerAnswer === "B" || playerAnswer === "b")
    playerAnswer = randomQuestion.answers[1];
  else if (playerAnswer === "C" || playerAnswer === "c")
    playerAnswer = randomQuestion.answers[2];
  else if (playerAnswer === "D" || playerAnswer === "d")
    playerAnswer = randomQuestion.answers[3];
  else incorrectInput = true;

  while (incorrectInput) {
    window.alert("Please Enter A Valid Answer");

    playerAnswer = window.prompt(
      `
      Round ${round}
      Cash: ${cashWon}
  
      Question: ${currentQuestion + 1}
  
      ${randomQuestion.question} 
      
      [Type A, B, C or D]
      ${
        currentRound > 1
          ? totalCalls > 0
            ? `[To Make a Friend Call Type Call] - Total Calls ${totalCalls}`
            : ""
          : ""
      }
  
      A. ${randomQuestion.answers[0]}
      B. ${randomQuestion.answers[1]}
      C. ${randomQuestion.answers[2]}
      D. ${randomQuestion.answers[3]}
      `
    );

    if (playerAnswer === "A" || playerAnswer === "a")
      playerAnswer = randomQuestion.answers[0];
    else if (playerAnswer === "B" || playerAnswer === "b")
      playerAnswer = randomQuestion.answers[1];
    else if (playerAnswer === "C" || playerAnswer === "c")
      playerAnswer = randomQuestion.answers[2];
    else if (playerAnswer === "D" || playerAnswer === "d")
      playerAnswer = randomQuestion.answers[3];

    incorrectInput = false;
  }

  if (playerAnswer === "Call" || playerAnswer === "call") {
    let updatedQuestion = friendCall(randomQuestion, correctAnswer);
    totalCalls--;
    playerAnswer = window.prompt(
      `
      Round ${round}
      Cash: ${cashWon}
  
      Question: ${currentQuestion + 1}
  
      ${randomQuestion.question} 
      
      [Type A or B]
      ${
        currentRound > 1
          ? totalCalls > 0
            ? `[To Make a Friend Call Type Call] - Total Calls ${totalCalls}`
            : ""
          : ""
      }
  
      A. ${randomQuestion.answers[0]}
      B. ${randomQuestion.answers[1]}
      `
    );
  }
}

function addCash(currentQuestion) {
  if (currentRound === 1 && currentQuestion === 1) cashWon = 100.0;
  else if (currentRound === 1 && currentQuestion === 2) cashWon = 500.0;
  else if (currentRound === 1 && currentQuestion === 3) cashWon = 10000.0;
  else if (currentRound === 2 && currentQuestion === 1) cashWon = 25000.0;
  else if (currentRound === 2 && currentQuestion === 2) cashWon = 50000.0;
  else if (currentRound === 2 && currentQuestion === 3) cashWon = 75000.0;
  else if (currentRound === 3 && currentQuestion === 1) cashWon = 125000.0;
  else if (currentRound === 3 && currentQuestion === 2) cashWon = 500000.0;
  else if (currentRound === 3 && currentQuestion === 3) cashWon = 1000000.0;
}

// Removes already asked question
function removeQuestion(currentQuestion) {
  // 1. Find an index of the current question by comparing ids
  const questionIndex = questions.findIndex(
    question => question.id === currentQuestion.id
  );

  // Remove that question
  questions.splice(questionIndex, 1);

  // Return an updated array of questions
  return questions;
}

// Creates a unique identification number
function makeID() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

// Creates a question object
function makeQuestion(question, answers, correct) {
  return {
    id: makeID(),
    question,
    answers,
    correct
  };
}

// Make a friend call functionality
let totalCalls = 2;
let callTriggered = false;
function friendCall(question, correctAnswer) {
  if (currentRound === 2 || currentRound === 3) {
    // Remove 2 incorrect answers from the list
    let filtered = [];
    for (let i = 0; i < question.answers.length; i++) {
      if (question.answers[i] !== correctAnswer)
        filtered.push(question.answers[i]);
    }

    filtered = filtered.slice(0, filtered.length - 1);

    // update the list
    let updated = [];
    for (let i = 0; i < question.answers.length; i++) {
      for (let j = 0; j < filtered.length; j++) {
        if (question.answers[i] !== filtered[i])
          updated.push(question.answers[i]);
      }
    }

    updated = updated
      .filter((el, index, self) => self.indexOf(el) !== index)
      .slice(0, 2);

    question.answers = updated;

    // return the newly updated list of answers
    return question;
  }
}

displayIntro();
runGame();
