var startBtn = document.getElementById("startGame");
var containerEl = document.querySelector("#containerEl");
var mainScreenEl = document.querySelector("#mainScreen");
var currentScoreEl = document.querySelector("#score");
var timeRemaining = document.querySelector("#timer");
var answerButton = document.querySelector("#answerBtns");
var answersEl = document.getElementById("answers");
var highScoreEl = document.getElementById("high-scores");
var feedBack = document.getElementById("feed-back");

var timerCount = 90;
var score = 0;
var questionIndex = 0;


// start quiz game
var startQuiz = function () {
    startBtn.addEventListener("click", function () {
        mainScreenEl.style.display = "none";
        answerButton.style.display = "block";
        currentScoreEl.style.display = "block";
        timeRemaining.style.display = "block";
        replaceQ();
        time();
    });
    if (timerCount <= 0) {
        return(startQuiz);
    }
}
startQuiz();
// timer for player
var time = function () {
   var timer = setInterval(function () {
        timeRemaining.innerHTML = timerCount--;
        // clearInterval(timerCount);
        if (timerCount <= 0) {
            clearInterval(timer);
            endGame();
            feedBack.style.display = "block"
            feedBack.textContent = "Your time ran out!"
            
        }
    }, 1000);
    
}
// loads new questions onto page
var replaceQ = function () {

    var currentQuestion = quizQuestions[questionIndex];
    var titleEl = document.getElementById("mainQuestion");
    titleEl.textContent = currentQuestion.question;
    currentScoreEl.textContent = score + "/4";
    answersEl.textContent = "";
    currentQuestion.answers.forEach(function (currentAnswer) {
        var choices = document.createElement("button");
        choices.textContent = currentAnswer;
        answersEl.append(choices)
        if (timerCount <= 0) {
            return (replaceQ);
        }
        if (questionIndex >= quizQuestions.length) {
            endGame();
        }
        
        choices.addEventListener("click", function () {
            if (currentAnswer === quizQuestions[questionIndex].correctAnswer) {
                questionIndex++;
                score++;
                replaceQ();
                feedBack.style.display = "none"
            }
            else {
                timerCount -= 15;
                feedBack.textContent = "Incorrect";
                feedBack.style.display = "block";
            }
        })
    });
}
var endGame = function () {
    highScoreEl.style.display = "block";
    answerButton.style.display = "none";
    currentScoreEl.style.display = "none";
    timeRemaining.style.display = "none";
    var restartBtn = document.createElement("button");
    restartBtn.textContent = "Retake Quiz"
    highScoreEl.append(restartBtn);
    restartBtn.addEventListener("click", function () {
        mainScreenEl.style.display = "block";
        highScoreEl.style.display = "none";
        restartBtn.style.display = "none";
        feedBack.style.display = "none";
        timerCount = 90;
        score = 0;
        questionIndex = 0;
        return (endGame);


    })

}

