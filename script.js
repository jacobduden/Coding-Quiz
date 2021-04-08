var startBtn = document.getElementById("startGame");
var containerEl = document.querySelector("#containerEl");
var mainScreenEl = document.querySelector("#mainScreen");
var currentScoreEl = document.querySelector("#score");
var timeRemaining = document.querySelector("#timer");
var answerButton = document.querySelector("#answerBtns");
var answersEl = document.getElementById("answers");
var highScoreEl = document.getElementById("high-scores");
var feedBack = document.getElementById("feed-back");
var highScoreBtn = document.getElementById("highscore-button");

var timerCount = 90;
var score = 0;
var questionIndex = 0;

// start quiz game screen
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
        return
    }
}
startQuiz();
// timer for player
var time = function () {
    var timer = setInterval(function () {
        timeRemaining.innerHTML = timerCount--;
        if (timerCount <= 0) {
            clearInterval(timer);
            endGame();
            feedBack.style.display = "block"
            feedBack.textContent = "Game Over!"
            return
        }
    }, 1000);
}
// 
// loads new questions onto page
var replaceQ = function () {
    var currentQuestion = quizQuestions[questionIndex];
    if (currentQuestion === undefined) {
        timerCount = 0;
        currentScoreEl.textContent = score + "/4";
        return
    }
    var titleEl = document.getElementById("mainQuestion");
    titleEl.textContent = currentQuestion.question;
    currentScoreEl.textContent = score + "/4";
    answersEl.textContent = "";
    currentQuestion.answers.forEach(function (currentAnswer) {
        var choices = document.createElement("button");
        choices.className = "styleButton";
        choices.textContent = currentAnswer;
        answersEl.append(choices)
        if (timerCount <= 0) {
            return
        }
        choices.addEventListener("click", function () {
            if (currentAnswer === quizQuestions[questionIndex].correctAnswer) {
                questionIndex++;
                score++;
                replaceQ();
                feedBack.style.display = "none"
                localStorage.setItem("currentScore", score);
            }
            else {
                timerCount -= 15;
                feedBack.textContent = "Incorrect";
                feedBack.style.display = "block";
            }
        })
    });
}
var highScorePg = document.getElementById("highscorePage");
var userScoreIp = document.getElementById("userScoreInput");
var userSubmitBtn = document.getElementById("userSubmit");
let getScore;
let scoreList = [];
//end of game screen with user submittion screen
var endGame = function () {
    timerCount = 90;
    highScoreEl.style.display = "block";
    answerButton.style.display = "none";
    timeRemaining.style.display = "none";

    // submit button for local storage
    userSubmitBtn.addEventListener("click", function () {
        getScore = JSON.parse(localStorage.getItem("highscore"));
        if (getScore === null) {
            getScore = [];
        };

        let scoreValue = localStorage.getItem("currentScore");
        let initials = userScoreIp.value;
        getScore.push({ name: initials, cScore: scoreValue });
        localStorage.setItem("highscore", JSON.stringify(getScore));
    })
}

//Displays highscores page
var highscoreScreen = highScoreBtn.addEventListener("click", function () {
    mainScreenEl.style.display = "none";
    highScorePg.style.display = "block";
    loadLocal();
})
// loads localStorage onto Highscores page
var loadLocal = function () {
    getScore = JSON.parse(localStorage.getItem("highscore"));
    if (getScore === null) {
        getScore = [];
    };
    let scoreValue = localStorage.getItem("currentScore");
    let initials = userScoreIp.value;
    getScore.push({ name: initials, cScore: scoreValue });
    for (var i = 0; i < getScore.length; i++) {
        //appends localStorage values to page
        $("#highscoreAppend").append("<h1>" + getScore[i].name + "|" + getScore[i].cScore + "</h1>");
        console.log(getScore)
        if (getScore[i].cScore === null){
            $("#highscoreAppend").empty();
        }
        //only add non duplicated numbers
        if (scoreList.indexOf(getScore[i].cScore) === -1 && getScore[i].cScore != null) {
            scoreList.push(getScore[i]);
            getScore.pop();
        }
        
        scoreList.sort((a, b) => a.cScore - b.cScore);
    };
}
//button that clears local storage
var clearLocalBtn = document.getElementById("clearStorage");
clearLocalBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
    
})

//Takes user back to homescreen
var homeScreenBtn = document.getElementById("startScreen");
homeScreenBtn.addEventListener("click", function(){
    location.reload();
})
