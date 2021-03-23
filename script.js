var startBtn = document.getElementById("startGame");
var containerEl = document.querySelector("#containerEl");
var mainScreenEl = document.querySelector("#mainScreen");
var currentScoreEl = document.querySelector("#score");
var timeRemaining = document.querySelector("#timer");
var answerButton = document.querySelector("#answerBtns");
var answersEl = document.getElementById("answers");

var timerCount = 0;
var questionIndex = 0;

// start quiz game
var startQuiz = function () {
    startBtn.addEventListener("click", function () {
        mainScreenEl.style.display = "none";
        answerButton.style.display = "block";
        replaceQ();
    });
}
startQuiz();
// timer for player
var time = function () {

}
// loads new questions onto page
var replaceQ = function () {

    var currentQuestion = quizQuestions[questionIndex];
    var titleEl = document.getElementById("mainQuestion");
    titleEl.textContent = currentQuestion.question;

    answersEl.textContent = "";
    currentQuestion.answers.forEach(function (currentAnswer) {
        var choices = document.createElement("button");
        choices.textContent = currentAnswer;
        answersEl.append(choices)
        choices.addEventListener("click", function(){
            if (currentAnswer === quizQuestions[questionIndex].correctAnswer) {
               quizQuestions++;
            }
            else {
                console.log("wrong")
            }
        })
        

    });
}

