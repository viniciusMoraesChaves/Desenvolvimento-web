const questions = [
    {
        question: "Qual dessas frases não foi dita por Ramon Batista Soares?",
        options: [
            { text: "Eu nao!", correct: false},
            { text: "Deixa que eu dou!", correct: true},
            { text: "Eu não dou, só recebo!", correct: false},
            { text: "Eu só faço com a cabeça!", correct: false},
            
        ]
    },
    {
        question: "Qual é o local preferido de estudo/passatempo do grupo?",
        options: [
            { text: "PocoLoco", correct: false},
            { text: "Manacás", correct: true},
            { text: "Refeitório", correct: false},
            { text: "Quadra", correct: false},
        ]
    },
    {
        question: "Por qual esporte Vinicius de Moraes Chaves é facinado?",
        options: [
            { text: "Sentar lentin pros cria", correct: false},
            { text: "Futebol", correct: true},
            { text: "Patinação no gelo", correct: false},
            { text: "Polo aquatico", correct: false},
            
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[ currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }


}

function selectAnswer (e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}   

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

startQuiz();