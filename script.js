// 1. DATA: Our list of questions
const quizData = [
    {
        question: "Which game features a world made of blocks and 'Creepers'?",
        answers: ["Roblox", "Minecraft", "Terraria", "Fortnite"],
        correct: 1 // Minecraft is at index 1
    },
    {
        question: "Who is the main protagonist of The Legend of Zelda series?",
        answers: ["Zelda", "Ganon", "Link", "Tingle"],
        correct: 2
    },
    {
        question: "In Mario Kart, what is the most powerful item that targets the leader?",
        answers: ["Green Shell", "Mushroom", "Banana", "Blue Shell"],
        correct: 3
    },
    {
        question: "Which company created the PlayStation console?",
        answers: ["Nintendo", "Microsoft", "Sega", "Sony"],
        correct: 3
    },
    {
        question: "What is the name of the city in GTA V?",
        answers: ["Liberty City", "Los Santos", "Vice City", "San Fierro"],
        correct: 1
    },
    {
        question: "Which game involves a 'Battle Royale' where 100 players fight to be the last one standing?",
        answers: ["Fortnite", "Call of Duty", "Halo", "Among Us"],
        correct: 0
    },
    {
        question: "What is the name of the blue hedgehog who runs at supersonic speeds?",
        answers: ["Knuckles", "Tails", "Sonic", "Shadow"],
        correct: 2
    },
    {
        question: "In the game 'Portal', what is the name of the AI that guides/tricks you?",
        answers: ["Cortana", "GLaDOS", "Siri", "HAL 9000"],
        correct: 1
    },
    {
        question: "Which of these is NOT a Pokemon version?",
        answers: ["Red", "Gold", "Silver", "Copper"],
        correct: 3
    },
    {
        question: "Which game features the 'Elden Ring' and is created by FromSoftware?",
        answers: ["Dark Souls", "Bloodborne", "Elden Ring", "Sekiro"],
        correct: 2
    }
];

// 2. STATE: Variables that keep track of the game progress
let currentQuestionIndex = 0;
let score = 0;

// Grab HTML elements so we can change them with JS
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score-display');
const questionNumber = document.getElementById('question-number');
const finalScoreText = document.getElementById('final-score');

// 3. FUNCTIONS: The logic
function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update question text and number
    questionText.innerText = currentQuestion.question;
    questionNumber.innerText = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
    
    // Clear old answer buttons
    answerButtons.innerHTML = '';
    
    // Create new buttons for each answer
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => selectAnswer(index);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    const buttons = answerButtons.querySelectorAll('button');

    // Disable all buttons so user can't click multiple times
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        score++;
        updateScore();
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); // Show the right answer
    }

    // Wait 1.5 seconds, then move to next question
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function updateScore() {
    scoreDisplay.innerText = `Score: ${score}`;
}

function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreText.innerText = `You scored ${score} out of ${quizData.length}!`;
}

// 4. EVENT LISTENERS: Linking buttons to functions
document.getElementById('start-btn').onclick = startQuiz;
document.getElementById('restart-btn').onclick = startQuiz;
